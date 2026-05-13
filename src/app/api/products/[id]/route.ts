import { isAdmin } from '@/lib/authUtils'
import cloudinary from '@/lib/cloudinary'
import connectDB from '@/lib/mongoose'
import brand from '@/models/brand'
import category from '@/models/category'
import Product from '@/models/product'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await isAdmin(request)

    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    await connectDB()

    const { id } = params

    if (!id)
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      )

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct)
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting product by ID', error },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await isAdmin(req)
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    await connectDB()

    const { id } = params

    const productToModify = await Product.findById(id)
    if (!productToModify) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const contentType = req.headers.get('content-type') || ''

    let data: any
    let imageUrl: string | null = null

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const dataStr = formData.get('data')
      if (!dataStr || typeof dataStr !== 'string') {
        return NextResponse.json(
          { error: 'Missing data field' },
          { status: 400 }
        )
      }
      data = JSON.parse(dataStr)

      const image = formData.get('image') as File | null
      if (image) {
        const arrayBuffer = await image.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: 'products', resource_type: 'image' },
              (error, result) => {
                if (error) return reject(error)
                resolve(result)
              }
            )
            .end(buffer)
        })
        imageUrl = uploadResult.secure_url
      }
    } else {
      data = await req.json()
    }

    if (data.category) {
      const categoryDoc = await category.findOne({ name: data.category })
      if (!categoryDoc) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }
      data.category = categoryDoc._id
    }

    if (data.brand) {
      const brandDoc = await brand.findOne({ name: data.brand })
      if (!brandDoc) {
        return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
      }
      data.brand = brandDoc._id
    }

    if (imageUrl) {
      data.imageURL = imageUrl
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate('category')
      .populate('brand')
      .populate('variants.suppliers.supplier')

    return NextResponse.json(updatedProduct, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
