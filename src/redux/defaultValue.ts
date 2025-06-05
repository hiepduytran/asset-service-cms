import { BLACK, GREEN, ORANGE, PRIMARY, RED, WHITE } from '@/helper/colors'
import {
  ButtonConfig,
  CompanyConfig,
  CurrentOrg,
  FontConfig,
  TableConfig,
  ThemeColorConfig,
} from '@/redux/type'

const themeColorDefaultConfig: ThemeColorConfig = {
  layout: 'layout1',
  theme: 'THEME_1',
  firstMainColor: PRIMARY,
  secondMainColor: BLACK,
  thirdMainColor: '#E2E2E2',
  fourthMainColor: '#E2E2E2',
  successColor: GREEN,
  errorColor: RED,
  warningColor: ORANGE,
}

const fontDefaultConfig: FontConfig = {
  typeFont: 'Open Sans',

  h1Color: '#242424',
  h1Font: 'Open Sans',
  h1Size: 2.4,

  h2Color: '#242424',
  h2Font: 'Open Sans',
  h2Size: 2,

  h3Color: '#242424',
  h3Font: 'Open Sans',
  h3Size: 1.8,

  h4Color: '#242424',
  h4Font: 'Open Sans',
  h4Size: 1.4,

  h5Color: '#242424',
  h5Font: 'Open Sans',
  h5Size: 1.2,

  h6Color: '#242424',
  h6Font: 'Open Sans',
  h6Size: 1,

  subtitle1Color: '#242424',
  subtitle1Font: 'Open Sans',
  subtitle1Size: 0.8,

  subtitle2Color: '#242424',
  subtitle2Font: 'Open Sans',
  subtitle2Size: 0.75,

  body1Color: '#242424',
  body1Font: 'Open Sans',
  body1Size: 0.8,

  body2Color: '#242424',
  body2Font: 'Open Sans',
  body2Size: 0.75,

  captionColor: '#242424',
  captionFont: 'Open Sans',
  captionSize: 0.5,
}

const buttonDefaultConfig: ButtonConfig = {
  submitButton: {
    textColor: PRIMARY,
    hoverTextColor: WHITE,
    backgroundColor: WHITE,
    backgroundHoverColor: PRIMARY,
    borderColor: PRIMARY,
    borderHoverColor: PRIMARY,
  },
  draftButton: {
    textColor: '#747475',
    hoverTextColor: '#747475',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: '#DFE0EB',
    borderHoverColor: '#DFE0EB',
  },
  rejectButton: {
    textColor: '#747475',
    hoverTextColor: '#747475',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: '#DFE0EB',
    borderHoverColor: '#DFE0EB',
  },
  resetButton: {
    textColor: '#747475',
    hoverTextColor: '#747475',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: '#DFE0EB',
    borderHoverColor: '#DFE0EB',
  },
}

const companyConfig: CompanyConfig = {
  id: 0,
  username: '',
  timezone: '',
  symbol: '',
  domain: '',
  currency: 'VND',
  position: 'RIGHT',
  language: 'vn',
  decimalSeparator: 'COMMA',
  thousandSeparator: 'DOTS',
  floatRounding: 2,
  dateType: 'DD/MM/YYYY',
  code: '',
  name: '',
  countryId: 0,
  country: '',
  languageId: 0,
  languageCode: '',
  activated: true,
  parentId: null,
  parent: null,
  description: '',
  currencyId: 0,
  logo: '',
  phone: '',
  email: '',
  taxCode: '',
  address: '',
  firstName: '',
  lastName: '',
}

const tableConfig: TableConfig = []

const orgDefault: CurrentOrg = {
  id: 0,
  name: '',
}

const defaultValue = {
  themeColorDefaultConfig,
  fontDefaultConfig,
  buttonDefaultConfig,
  companyConfig,
  tableConfig,
  orgDefault,
}

export default defaultValue
