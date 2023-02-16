export default function blockUnwantedUids(frontEndElements:any, backEndElement:any)  {
    console.log(frontEndElements)
    frontEndElements?.forEach((element:any) => {
        if (element.uid != undefined) {
            // Check if this
            const found = backEndElement.find((backendElement:any) => backendElement.uid === element.uid);
            if (!found){
                console.warn('backend uid did not match to frontend uid', element.uid);
                element.uid = undefined
            }
        }
    });
}