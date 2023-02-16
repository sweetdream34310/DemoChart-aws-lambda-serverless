import { COUNTRIES } from '~~/../lib/types/Countries'

export default function getCountry(countryID:number) {
    const country = COUNTRIES.find(country => country.countryCode === countryID)
    return country?.name
 }