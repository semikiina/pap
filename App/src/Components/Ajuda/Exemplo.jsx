import React, { useState } from 'react'
import api from '../../Services/api';
import { DropzoneArea } from 'material-ui-dropzone';

const Exemplo = () => {
    const [images,setImages] = useState([]);

    const Example=(e)=>{
        
        var formdata = new FormData();
        var ins = images.length
        for (var x = 0; x < ins; x++) {
            formdata.append("image", images[x]);
        }
        api.post('product',formdata,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(data=>{
            console.log(data)
        })
    }

    return (
        <form onSubmit={Example}>
            <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click here."}
                onChange={(files) => setImages(files)}
                filesLimit={6}
            />
            <button type='submit'>Submit </button>
        </form>
    )
}

export default Exemplo
