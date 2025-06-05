/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Dispatch,
  SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  useDropzone,
  DropzoneState,
  FileRejection,
  DropzoneOptions,
} from 'react-dropzone'
import { toast } from 'sonner'
import {
  Trash2 as RemoveIcon,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Paperclip } from 'lucide-react'

const createFileUploadPresignedUrl = async () => {}
const createFilePresignedUploadRecord = async () => {}

interface NimbusFileRecord {
  fileId: number
  fileExt: string
  fileName: string
  fileSize: number
  fileType: string
  fileURI: string
}

type DirectionOptions = 'rtl' | 'ltr' | undefined

type FileUploaderContextType = {
  dropzoneState: DropzoneState
  isLOF: boolean
  isFileTooBig: boolean
  removeFileFromSet: (index: number) => void
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  orientation: 'horizontal' | 'vertical'
  direction: DirectionOptions
}

const FileUploaderContext = createContext<FileUploaderContextType | null>(null)

export const useFileUpload = () => {
  const context = useContext(FileUploaderContext)
  if (!context) {
    throw new Error('useFileUpload must be used within a FileUploaderProvider')
  }
  return context
}

type FileUploadStatus = {
  file: File
  status: 'uploading' | 'success' | 'error'
  error?: string
}

type FileUploaderProps = {
  value: File[] | null
  reSelect?: boolean
  onValueChange: (value: File[] | null) => void
  onUploadComplete?: (urls: number[]) => void
  dropzoneOptions: DropzoneOptions
  orientation?: 'horizontal' | 'vertical'
}

export const FileUploader = forwardRef<
  HTMLDivElement,
  FileUploaderProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      dropzoneOptions,
      value,
      onValueChange,
      onUploadComplete,
      reSelect,
      orientation = 'vertical',
      children,
      dir,
      ...props
    },
    ref
  ) => {
    const { data: session } = useSession()
    const [isFileTooBig, setIsFileTooBig] = useState(false)
    const [isLOF, setIsLOF] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<FileUploadStatus[]>([])
    const {
      accept = {
        'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      },
      maxFiles = 1,
      maxSize = 4 * 1024 * 1024,
      multiple = true,
    } = dropzoneOptions

    const reSelectAll = maxFiles === 1 ? true : reSelect
    const direction: DirectionOptions = dir === 'rtl' ? 'rtl' : 'ltr'

    const removeFileFromSet = useCallback(
      (i: number) => {
        if (!value) return
        const newFiles = value.filter((_, index) => index !== i)
        onValueChange(newFiles)
      },
      [value, onValueChange]
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value) return

        const moveNext = () => {
          const nextIndex = activeIndex + 1
          setActiveIndex(nextIndex > value.length - 1 ? 0 : nextIndex)
        }

        const movePrev = () => {
          const nextIndex = activeIndex - 1
          setActiveIndex(nextIndex < 0 ? value.length - 1 : nextIndex)
        }

        const prevKey =
          orientation === 'horizontal'
            ? direction === 'ltr'
              ? 'ArrowLeft'
              : 'ArrowRight'
            : 'ArrowUp'

        const nextKey =
          orientation === 'horizontal'
            ? direction === 'ltr'
              ? 'ArrowRight'
              : 'ArrowLeft'
            : 'ArrowDown'

        if (e.key === nextKey) {
          moveNext()
        } else if (e.key === prevKey) {
          movePrev()
        } else if (e.key === 'Enter' || e.key === 'Space') {
          if (activeIndex === -1) {
            dropzoneState.inputRef.current?.click()
          }
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
          if (activeIndex !== -1) {
            removeFileFromSet(activeIndex)
            if (value.length - 1 === 0) {
              setActiveIndex(-1)
              return
            }
            movePrev()
          }
        } else if (e.key === 'Escape') {
          setActiveIndex(-1)
        }
      },
      [value, activeIndex, removeFileFromSet, direction, orientation]
    )

    const uploadFile = async (file: File) => {
      const formData = new FormData()
      formData.append('files', file)
      formData.append('metadata', JSON.stringify({}))

      try {
        // Add timestamp to filename to prevent duplicates
        const timestamp = new Date().getTime()
        const fileExt = file.name.split('.').pop() || ''
        const fileNameWithoutExt = file.name.slice(0, -(fileExt.length + 1))
        const uniqueFileName = `${fileNameWithoutExt}_${timestamp}.${fileExt}`

        // Get presigned URL using SDK
        const presignedResponse =
          await createFileUploadPresignedUrl()
          //   {
          //   body: {
          //     objectKey: uniqueFileName,
          //   },
          //   headers: {
          //     Authorization: `Bearer ${session?.user?.accessToken}`,
          //   },
          // }
        console.log('Presigned response:', presignedResponse)

        // if (presignedResponse.error) {
        //   throw new Error('Failed to get presigned URL')
        // }

        // const presignedUrl = presignedResponse.data
        // console.log('Presigned URL response:', presignedUrl)
        // console.log('Type of presignedUrl:', typeof presignedUrl)

        // Now upload the file using the presigned URL
        // const uploadResponse = await fetch(presignedUrl as string, {
        //   method: 'PUT',
        //   body: file,
        //   headers: {
        //     'Content-Type': file.type,
        //   },
        // })

        // if (!uploadResponse.ok) {
        //   throw new Error('Upload failed')
        // }
        // console.log('Upload response:', uploadResponse)

        // Make the second API call with file metadata using SDK
        const recordResponse =
          await createFilePresignedUploadRecord()
          //   {
          //   body: {
          //     fileExt,
          //     fileName: uniqueFileName,
          //     fileSize: file.size,
          //     fileType: file.type,
          //     fileURI: presignedUrl as string,
          //   },
          //   headers: {
          //     Authorization: `Bearer ${session?.user?.accessToken}`,
          //   },
          // }

        // if (recordResponse.error) {
        //   throw new Error("Failed to record file metadata");
        // }

        // const recordData = recordResponse.data as NimbusFileRecord;
        // console.log("Record data:", recordData);
        // return recordData.fileId;
      } catch (error) {
        console.error('Upload error:', error)
        throw error
      }
    }

    const onDrop = useCallback(
      async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const files = acceptedFiles

        if (!files) {
          toast.error('file error , probably too big')
          return
        }

        const newValues: File[] = value ? [...value] : []

        if (reSelectAll) {
          newValues.splice(0, newValues.length)
        }

        files.forEach((file) => {
          if (newValues.length < maxFiles) {
            newValues.push(file)
          }
        })

        onValueChange(newValues)

        // Initialize upload status for new files
        const newUploadStatus = newValues.map((file) => ({
          file,
          status: 'uploading' as const,
        }))
        setUploadStatus(newUploadStatus)

        // Upload files and get URLs
        if (onUploadComplete) {
          setUploading(true)
          try {
            const uploadPromises = newValues.map(async (file, index) => {
              try {
                const url = await uploadFile(file)
                setUploadStatus((prev) =>
                  prev.map((status, i) =>
                    i === index ? { ...status, status: 'success' } : status
                  )
                )
                return url
              } catch (error) {
                setUploadStatus((prev) =>
                  prev.map((status, i) =>
                    i === index
                      ? { ...status, status: 'error', error: 'Upload failed' }
                      : status
                  )
                )
                throw error
              }
            })

            const urls = await Promise.all(uploadPromises)
            // Filter out any undefined values and ensure only numbers are passed
            // const validUrls = urls.filter(
            //   (url:number): url is number => url !== undefined,
            // );
            // onUploadComplete(validUrls);
          } catch (error) {
            console.error('Upload failed:', error)
            toast.error('Some files failed to upload')
          } finally {
            setUploading(false)
          }
        }

        if (rejectedFiles.length > 0) {
          for (let i = 0; i < rejectedFiles.length; i++) {
            if (rejectedFiles[i].errors[0]?.code === 'file-too-large') {
              toast.error(
                `File is too large. Max size is ${maxSize / 1024 / 1024}MB`
              )
              break
            }
            if (rejectedFiles[i].errors[0]?.message) {
              toast.error(rejectedFiles[i].errors[0].message)
              break
            }
          }
        }
      },
      [
        reSelectAll,
        value,
        onUploadComplete,
        // session?.user?.accessToken,
        maxFiles,
        maxSize,
        onValueChange,
        uploadFile,
      ]
    )

    useEffect(() => {
      if (!value) return
      if (value.length === maxFiles) {
        setIsLOF(true)
        return
      }
      setIsLOF(false)
    }, [value, maxFiles])

    const opts = dropzoneOptions
      ? dropzoneOptions
      : { accept, maxFiles, maxSize, multiple }

    const dropzoneState = useDropzone({
      ...opts,
      onDrop,
      onDropRejected: () => setIsFileTooBig(true),
      onDropAccepted: () => setIsFileTooBig(false),
    })

    return (
      <FileUploaderContext.Provider
        value={{
          dropzoneState,
          isLOF,
          isFileTooBig,
          removeFileFromSet,
          activeIndex,
          setActiveIndex,
          orientation,
          direction,
        }}
      >
        <div
          ref={ref}
          tabIndex={0}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            'grid w-full focus:outline-none overflow-hidden ',
            className,
            {
              'gap-2': value && value.length > 0,
            }
          )}
          dir={dir}
          {...props}
        >
          {children}
          <FileUploaderContent>
            {value &&
              value.length > 0 &&
              value.map((file, i) => {
                const status = uploadStatus[i]
                return (
                  <FileUploaderItem
                    key={i}
                    file={file}
                    index={i}
                    uploadStatus={status?.status || 'uploading'}
                  />
                )
              })}
          </FileUploaderContent>
        </div>
      </FileUploaderContext.Provider>
    )
  }
)

FileUploader.displayName = 'FileUploader'

export const FileUploaderContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { orientation } = useFileUpload()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn('w-full px-1')}
      ref={containerRef}
      aria-description="content file holder"
    >
      <div
        {...props}
        ref={ref}
        className={cn(
          'flex rounded-xl gap-1',
          orientation === 'horizontal' ? 'flex-raw flex-wrap' : 'flex-col',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
})

FileUploaderContent.displayName = 'FileUploaderContent'

export const FileUploaderItem = ({
  file,
  index,
  uploadStatus,
  className,
  ...props
}: {
  file: File
  index: number
  uploadStatus: FileUploadStatus['status']
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { removeFileFromSet, activeIndex, setActiveIndex } = useFileUpload()

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'group relative flex items-center justify-between gap-2 rounded-lg border p-2 text-sm',
        activeIndex === index && 'ring-2 ring-primary',
        className
      )}
      onClick={() => setActiveIndex(index)}
      {...props}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Paperclip className="h-4 w-4 shrink-0" />
        <span className="truncate">{file.name}</span>
      </div>
      <div className="flex items-center gap-2">
        {uploadStatus === 'uploading' && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {uploadStatus === 'success' && (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        )}
        {uploadStatus === 'error' && (
          <AlertCircle className="h-4 w-4 text-red-500" />
        )}
        <button
          type="button"
          aria-label="Remove file"
          onClick={(e) => {
            e.stopPropagation()
            removeFileFromSet(index)
          }}
          className="ml-auto rounded-md p-1 hover:bg-destructive/90 hover:text-destructive-foreground"
        >
          <RemoveIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

FileUploaderItem.displayName = 'FileUploaderItem'

export const FileInput = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { dropzoneState, isFileTooBig, isLOF } = useFileUpload()
  const rootProps = isLOF ? {} : dropzoneState.getRootProps()
  return (
    <div
      ref={ref}
      {...props}
      className={`relative w-full ${
        isLOF ? 'opacity-50 cursor-not-allowed ' : 'cursor-pointer '
      }`}
    >
      <div
        className={cn(
          `w-full rounded-lg duration-300 ease-in-out
         ${
           dropzoneState.isDragAccept
             ? 'border-green-500'
             : dropzoneState.isDragReject || isFileTooBig
               ? 'border-red-500'
               : 'border-gray-300'
         }`,
          className
        )}
        {...rootProps}
      >
        {children}
      </div>
      <Input
        ref={dropzoneState.inputRef}
        disabled={isLOF}
        {...dropzoneState.getInputProps()}
        className={`${isLOF ? 'cursor-not-allowed' : ''}`}
      />
    </div>
  )
})

FileInput.displayName = 'FileInput'
