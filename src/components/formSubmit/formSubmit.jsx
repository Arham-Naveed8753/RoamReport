import React, {useCallback , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import { useForm } from 'react-hook-form'
import {RTE , Button , Input , Select } from '../index'




function formSubmit({post}) {

    const {register , handleSubmit , control , setValue , getValues , watch} = useForm(
        {
            defaultValues : {
                title : post?.title || '',
                content : post?.content || '',
                status : post?.status || 'active',
                slug : post?.slug || '',
               
            }
        }
    )

    const navigate = useNavigate()
    const userData = useSelector((state)=> (
        state.auth.userData
    ))

    const submit = async (data) => {
        if (post) {


            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null ;

            
            if (file) {
                service.deleteFile(post.featureImage)
            }
            const dbPost = await service.updatePost(post.$id , {
                ...data ,
                featureImage : file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            
            const file = await service.uploadFile(
                data.image[0]
            )

            
            if (file) {
                const fileId = file.$id
                data.featureImage = fileId
                console.log(userData)
                const dbPost = 
                await service.createPost(
                    {
                        ...data ,
                        userId : userData.$id
                    }
                )
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }

    const slugTransformation = useCallback(
      (value) => {
        if (value && typeof value === 'string') {
            return value
            .trim()
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z0-9\s-]/g, '') // 1. Remove all special characters except spaces and hyphens
            .replace(/\s+/g, '-')            // 2. Replace one or more spaces with a single hyphen
            .replace(/-+/g, '-')             // 3. Prevent multiple consecutive hyphens (e.g., "hello---world")
        } else return ''
      },
      [],
    )

    useEffect(()=>{
        const subscription = watch((value , {name} )=> {
            if (name === 'title') {
                setValue('slug' , slugTransformation(value.title,{shouldValidate : true}))
                
            }


            return () => subscription.unsubscribe()
        })

    }, [watch , slugTransformation , setValue])
    
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-jakrta text-brown">
      
      <div className="mb-8 border-b border-gray/20 pb-6">
        <span className="font-xanhMono text-one_two uppercase tracking-zero-zero_two_five text-blue bg-light-blue/40 px-3 py-1 rounded-full">
            {post ? 'Edit Article' : 'Editorial Desk'}
        </span>
        <h1 className="font-gaseok text-three_five text-brown mt-3">
            {post ? `Editing: ${post.title}` : 'Craft a New Story.'}
        </h1>
        <p className="text-gray text-one_two mt-1">
            Share your long walks, wrong turns, and everyday discoveries with readers.
        </p>
      </div>

      <form onSubmit={handleSubmit(submit)} className='flex flex-wrap -mx-2'>
        
        <div className='w-full lg:w-2/3 px-2 mb-8 lg:mb-0'>
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray/10 space-y-6">
               <Input
                    label="Title :"
                    placeholder="Title"
                    className="w-full px-4 py-3.5 bg-skin/40 border border-gray/30 rounded-xl text-one text-brown focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                    labelClassName="block text-one_eight_seven_five font-medium text-brown mb-2"
                    {...register("title", { required: true })}
                />
               <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="w-full px-4 py-3.5 bg-skin/40 border border-gray/30 rounded-xl text-one text-brown font-xanhMono focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                    labelClassName="block text-one_eight_seven_five font-medium text-brown mb-2"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div>
                    <label className="block text-one_eight_seven_five font-medium text-brown mb-2">Content :</label>
                    <RTE name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>
        </div>

        <div className="w-full lg:w-1/3 px-2 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray/10 space-y-6">
                <Input
                    label="Featured Image :"
                    type={`file`}
                    className="w-full text-one text-gray file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-one_eight_seven_five file:font-semibold file:bg-light-blue file:text-blue hover:file:bg-light-blue/80 transition-all cursor-pointer"
                    labelClassName="block text-one_eight_seven_five font-medium text-brown mb-2"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                
                {post && (
                    <div className="w-full mb-4 rounded-2xl overflow-hidden border border-gray/20">
                        <img
                            src={service.filePreview(post.featureImage)}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                        />
                    </div>
                )}

                <Select 
                    options={['active' , 'inactive']}
                    label={`status`}
                    className={`w-full px-4 py-3.5 bg-skin/40 border border-gray/30 rounded-xl text-one text-brown focus:outline-none focus:ring-2 focus:ring-blue transition-all cursor-pointer`}
                    labelClassName="block text-one_eight_seven_five font-medium text-brown mb-2 capitalize"
                    {...register('status' , {required : true})}
                />

                <Button 
                    type="submit" 
                    bgColor={post ? "bg-olive hover:bg-olive/90" : "bg-blue hover:bg-dark-blue"} 
                    className="w-full py-4 text-cream font-semibold text-one_two rounded-xl transition-all shadow-lg shadow-blue/20 cursor-pointer"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </div>
      </form>
    </div>
  )
}

export default formSubmit