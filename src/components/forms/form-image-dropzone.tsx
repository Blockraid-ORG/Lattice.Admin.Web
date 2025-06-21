'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type ImageDropzoneProps = {
  onChange?: (file: File | null) => void
  defaultImage?: string
  maxSizeMB?: number
  accept?: string[]
  className?: string
  text?:string
}

export function FormImageDropzone({
  onChange,
  defaultImage,
  maxSizeMB = 4,
  accept = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
  className,
  text,
}: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage ?? null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      onChange?.(file)
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSizeMB * 1024 * 1024,
    multiple: false,
  })

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col hover:bg-slate-100 hover:dark:bg-slate-900 items-center justify-center aspect-square border border-dashed rounded-md overflow-hidden cursor-pointer transition',
        isDragActive ? 'border-cyan-400 bg-cyan-50' : 'border-gray-300',
        className
      )}
    >
      <input {...getInputProps()} />
      {preview ? (
        <Image
          src={preview}
          alt="Preview"
          width={200}
          height={200}
          className="object-contain"
        />
      ) : (
        <div className="text-center text-sm text-gray-500">
            <p className='text-xs'>{text || 'Drag & drop image here, or click to select'}</p>
          {/* <p className="text-xs mt-1 text-gray-400">Accepted: {accept.join(', ')}</p>
          <p className="text-xs">Max size: {maxSizeMB}MB</p> */}
        </div>
      )}
      {fileRejections.length > 0 && (
        <p className="text-sm text-red-500 mt-2">
          {fileRejections[0].errors[0].message}
        </p>
      )}
    </div>
  )
}
