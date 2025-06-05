import { BaseResponse } from '@/service/type'

export interface Partner {
  id: number
  code: string
  name: string
  avatarUrl: string
  businessSectorId: number
  sharingModeVendor: string
  sharingModeOem: string
  sharingModeB2c: string
  sharingModeAnother: string
  sharingModeShipping: string
  sharingModePayment: string
  sharingModeMerchant: string
  sharingModeB2b: string
  businessSector: string
  isCompany: boolean
  type: string
  email: string
  phoneNumber: string
  countryId: number | null
  country: any
  regionId: number | null
  region: any
  cityId: number | null
  city: any
  districtId: number | null
  district: any
  wardId: number | null
  ward: any
  address: string
  joinDate: string
  partnerTagIds: number[]
  partnerTagId: number
  partnerTags: PartnerTag[]
  cardId: string
  birth: string
  gender: string
  website: string
  anotherAddress: AnotherAddress[]
  contacts: Contact[]
  bankAccounts: BankAccount[]
  merchantPicture: MerchantPicture
  note: string
  isCustomer: boolean
  isVendor: boolean
  isMerchant: boolean
  isB2c: boolean
  isOem: boolean
  isPaymentPartner: boolean
  isShippingPartner: boolean
  isB2b: boolean
  isAnotherPartner: boolean
  vendorActivated: boolean
  oemActivated: boolean
  b2cActivated: boolean
  anotherActivated: boolean
  shippingActivated: boolean
  paymentActivated: boolean
  merchantActivated: boolean
  b2bActivated: boolean
  status: string
  activated: boolean
  orges?: Orges[]
}

export interface Orges {
  id: number
  code: string
  name: string
}

export interface PartnerTag {
  id: number
  code: string
  name: string
  description: string
  activated: boolean
  createdAt: string
  createdBy: string
  isCustomer: boolean
  isVendor: boolean
  isMerchant: boolean
  isB2b: boolean
  isB2c: boolean
  isOem: boolean
  isPaymentPartner: boolean
  isShippingPartner: boolean
  isAnotherPartner: boolean
}

interface Options {
  name: string
}

export interface AnotherAddress {
  id: number
  name: string
  addressType:
    | 'INVOICE_ADDRESS'
    | 'DELIVERY_ADDRESS'
    | 'OTHER_ADDRESS'
    | 'PERSONAL_ADDRESS'
  countryId: number | null | Options
  country: string | null
  regionId: number | null
  region: string | null | Options
  cityId: number | null
  city: string | null | Options
  districtId: number | null
  district: string | null | Options
  wardId: number | null
  ward: string | null | Options
  address: string | null
}

export interface Contact {
  id: number
  name: string
  title: string
  gender: string
  position: string
  email: string
  birth: string
  phoneNumber: string
  cardId: string
  avatarUrl: string
}

export interface BankAccount {
  id: number
  bankId: number
  bank: string
  bankOrgId: number
  bankOrg: string
  accountNumber: string
  accountHolder: string
  logoUrl: string
}

export interface MerchantPicture {
  id: number
  partnerId: number
  portrait: string
  personalIdentificationDocs: PersonalIdentificationDocs
  storeImage: string[]
  attachedFiles: AttachedFiles
}

export interface PersonalIdentificationDocs {
  files: File[]
}

export interface File {
  nameFile: string
  url: string
}

export interface AttachedFiles {
  files: File[]
}

export type ResponsePartnerDetail = {
  GET_DETAIL: BaseResponse<Partner>
}
