import { createClient } from "@supabase/supabase-js"


const anonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcmpudndtZXJxa2dqaWJuaHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NDc2OTcsImV4cCI6MjA4NDEyMzY5N30.8rNCWaPwZcLMmQ8vZ3uj_lUsjWeJ2bPZ0mKMTKl-M6w"
const supabaseurl = "https://bqrjnvwmerqkgjibnhvd.supabase.co"

const supabase = createClient(supabaseurl, anonkey)

/*
 supabase.storage.from("images").upload(file.name, file,{
        upsert :false,
        cacheControl:"3600",
    } ).then(
        ()=>{
            const publicurl =supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl
            console.log(publicurl)
            

    })

*/

export default function mediaUpload(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected")
        } else {
            const timestamp = new Date().getTime();
            const fileName = timestamp + file.name

            supabase.storage
                .from("images").upload(fileName, file, {
                    upsert: false,
                    cacheControl: "3600",
                }).then(
                    () => {
                        const publicurl = supabase.storage
                            .from("images")
                            .getPublicUrl(fileName).data.publicUrl
                        resolve(publicurl)

                    }).catch(() => {
                        reject("An error occured")
                    })
        }
    })






}