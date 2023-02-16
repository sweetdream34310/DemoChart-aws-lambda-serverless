export default function getImgUrl(img:string):string | undefined {
    if (img === undefined || img === null) return undefined
    const config = useRuntimeConfig()
    const bucket = config.BucketUrl;
    return bucket + img + '.jpg' 
 }