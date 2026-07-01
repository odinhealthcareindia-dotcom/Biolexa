import siteSettings from "./siteSettings"
import homepage from "./homepage"
import aboutpage from "./aboutpage"
import navigation from "./navigation"
import page from "./page"
import product from "./product"
import productCategory from "./productCategory"
import post from "./post"
import author from "./author"
import category from "./category"
import tag from "./tag"
import lead from "./documents/lead"

// Objects
import seo from "./objects/seo"
import portableText from "./objects/portableText"
import customLink from "./objects/link"
import pageBuilder from "./objects/pageBuilder"

export const schemaTypes = [
  // Documents
  siteSettings,
  homepage,
  aboutpage,
  navigation,
  page,
  product,
  productCategory,
  post,
  author,
  category,
  tag,
  lead,

  // Objects
  seo,
  portableText,
  customLink,
  pageBuilder,
]
