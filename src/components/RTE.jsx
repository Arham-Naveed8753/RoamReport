import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'
function RTE({name ,label , control , defaultValue = ''  }) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller 
        name={name || 'content'}
        control={control}
        render={({field : {onChange}})=> (
            <Editor 
            apiKey='5a67tamjurszksqqx804lrkjp1z1434egp1mu95yr87s4avv'
            initialValue={defaultValue || <p>Start writing your travel story here...</p>}
            init={{
            height: 500,
            menubar: 'file edit view insert format tools table help',
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample'
            ],
            toolbar: 
              'undo redo | blocks fontfamily fontsize | ' +
              'bold italic underline strikethrough forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist checklist outdent indent | ' +
              'link image media table codesample | removeformat fullscreen help',
            content_style: `
              body { 
                font-family: "Plus Jakarta Sans", sans-serif; 
                font-size: 1rem; 
                color: #332115; 
                background-color: #FFFFFF;
                padding: 1rem;
              }
            `,
            skin: 'oxide',
            content_css: 'default',
            branding: false,
            promotion: false,
          }}
          onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

export default RTE