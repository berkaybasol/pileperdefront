'use client'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, getProductGalleryDefaultHeroCopy } from '@/lib/productGalleryContent'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-rustikli-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const canonicalUrl = 'https://pileperde.com.tr/model-perdeler/rustikli-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'Rustikli Perde', url: '/model-perdeler/rustikli-perde' },
]

const productImages = [
  { id: 1, src: '/api/public/media/images/4b0f28ee-b79d-44e0-880d-5aec64bb13e3/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 1' },
  { id: 2, src: '/api/public/media/images/0f9bc00b-efd9-4275-bf9c-3e7f3a376bac/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 2' },
  { id: 3, src: '/api/public/media/images/0163f260-1560-46b9-9282-c7fcf88b1038/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 3' },
  { id: 4, src: '/api/public/media/images/00a6c158-4e5c-47c9-8e4f-a5af429697ff/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 4' },
  { id: 5, src: '/api/public/media/images/5c4f0447-b64e-4026-89c0-c8a24af66aea/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 5' },
  { id: 6, src: '/api/public/media/images/66eabe96-80c6-4d99-b111-30a96a1e557d/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 6' },
  { id: 7, src: '/api/public/media/images/179e5746-ee11-42a1-8a73-b8f290edc0b5/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 7' },
  { id: 8, src: '/api/public/media/images/48b18100-bbbb-45ed-97f0-b753458e8571/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 8' },
  { id: 9, src: '/api/public/media/images/7ce88970-41ca-413a-93ac-e21c22ed5469/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 9' },
  { id: 10, src: '/api/public/media/images/6f89fd96-4ef3-409d-8670-6d2c1360824f/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 10' },
  { id: 11, src: '/api/public/media/images/0e18a82b-fec7-461c-a6bf-b137394a5807/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 11' },
  { id: 12, src: '/api/public/media/images/762eff48-e39a-46ee-8115-fb517020858d/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 12' },
  { id: 13, src: '/api/public/media/images/92b818b5-9d87-44c3-8ce1-0168482e6631/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 13' },
  { id: 14, src: '/api/public/media/images/7a2e6222-2c85-4a1a-be80-b0906514e004/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 14' },
  { id: 15, src: '/api/public/media/images/9d9108a7-fca9-4132-b9e4-2c58bef41ec9/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 15' },
  { id: 16, src: '/api/public/media/images/bd951b21-8b4e-4395-93db-92745bf46201/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 16' },
  { id: 17, src: '/api/public/media/images/ca4f5b10-0e69-4462-a7c4-f49a8333d3ae/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 17' },
  { id: 18, src: '/api/public/media/images/26f03ab2-f499-4660-a652-3bbfe1951491/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 18' },
  { id: 19, src: '/api/public/media/images/ac7b79bd-634d-4a54-9b60-9ed444dfff27/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 19' },
  { id: 20, src: '/api/public/media/images/ec5459e3-c575-4397-b911-8cd3044887ad/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 20' },
  { id: 21, src: '/api/public/media/images/af195fb9-b360-4983-ace0-9ef8a2a6dced/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 21' },
  { id: 22, src: '/api/public/media/images/625a5cd6-7ce5-4586-a96e-d64f24385c45/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 22' },
  { id: 23, src: '/api/public/media/images/62154fc4-146d-4579-831a-8557f7753386/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 23' },
  { id: 24, src: '/api/public/media/images/cb96de62-8936-4870-8167-89fd00611ca6/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 24' },
  { id: 25, src: '/api/public/media/images/339377e3-ec09-4ec5-8649-a26a2012f2e3/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 25' },
  { id: 26, src: '/api/public/media/images/039eaca5-a6e8-4d36-81c8-1bc759e34ac5/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 26' },
  { id: 27, src: '/api/public/media/images/63a268bd-5d7d-4fe8-b805-140ced42a58f/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 27' },
  { id: 28, src: '/api/public/media/images/b25d63b5-a751-41b8-9b65-7ad36699e125/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 28' },
  { id: 29, src: '/api/public/media/images/c7de38d4-0e65-4547-b26e-dbf54c148a62/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 29' },
  { id: 30, src: '/api/public/media/images/c0a93be0-1e87-4bfc-880a-876fb04f4db4/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 30' },
  { id: 31, src: '/api/public/media/images/04fa8690-4013-41e8-be70-86d0876f9665/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 31' },
  { id: 32, src: '/api/public/media/images/0691a855-2b48-4f3d-9df3-0a2fa46c1cb8/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 32' },
  { id: 33, src: '/api/public/media/images/86b776be-2843-4eec-b4f8-9b109ed3cbfa/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 33' },
  { id: 34, src: '/api/public/media/images/d4153a44-4803-492a-8c34-1ac087188fbb/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 34' },
  { id: 35, src: '/api/public/media/images/159d17b5-8377-497c-a5dd-1e532aa50787/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 35' },
  { id: 36, src: '/api/public/media/images/9954de1e-fac1-4b91-bd71-6edae90b6aee/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 36' },
  { id: 37, src: '/api/public/media/images/309b07a0-9d04-43ea-bc45-b8544648f1cb/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 37' },
  { id: 38, src: '/api/public/media/images/53da90f9-1280-4548-af33-3e1e94b69a27/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 38' },
  { id: 39, src: '/api/public/media/images/94efb39a-4dd7-4e54-9ac3-6af26a7d441c/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 39' },
  { id: 40, src: '/api/public/media/images/8934dc17-3181-4335-8335-51467cd64f51/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 40' },
  { id: 41, src: '/api/public/media/images/7b46025f-3985-40a7-993e-6cf813503b86/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 41' },
  { id: 42, src: '/api/public/media/images/9fa820d0-fa10-49ea-aabe-9c847ab4757b/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 42' },
  { id: 43, src: '/api/public/media/images/dd56d118-6d0c-44ca-8e62-5c76e54f3813/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 43' },
  { id: 44, src: '/api/public/media/images/b0a27ad7-807a-434f-a350-9aa4a88ba042/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 44' },
  { id: 45, src: '/api/public/media/images/d26de5d1-d3d6-4222-9410-f26fe8332281/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 45' },
  { id: 46, src: '/api/public/media/images/0f13c6ff-0639-4613-a62b-b33f33e24433/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 46' },
  { id: 47, src: '/api/public/media/images/64560553-48bb-4db0-a276-e7b928e56ee1/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 47' },
  { id: 48, src: '/api/public/media/images/b2f2e69f-d358-485d-b253-f623f9db21cd/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 48' },
  { id: 49, src: '/api/public/media/images/2491252f-8e9f-48b1-8c1d-26150daa01c8/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 49' },
  { id: 50, src: '/api/public/media/images/6e90a6cf-2435-4fff-9ad8-9d450271a568/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 50' },
  { id: 51, src: '/api/public/media/images/d17e04b3-7e29-4814-94b9-2a27a633d89b/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 51' },
  { id: 52, src: '/api/public/media/images/9dc24054-7fba-4988-8535-7a2e1e2ca23d/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 52' },
  { id: 53, src: '/api/public/media/images/4e584f22-33a2-4b24-969e-4d7301e3199a/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 53' },
  { id: 54, src: '/api/public/media/images/38e4a577-d2e7-471b-b006-e0d3e7683024/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 54' },
  { id: 55, src: '/api/public/media/images/0656fce4-35dd-4cda-9ac2-a6c7424bda00/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 55' },
  { id: 56, src: '/api/public/media/images/5675eb72-815f-415b-9a06-7fee162e9a0d/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 56' },
  { id: 57, src: '/api/public/media/images/c6ae279f-0163-4cf4-acf7-ba6870037bdf/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 57' },
  { id: 58, src: '/api/public/media/images/6f9a3fd2-a0aa-4667-a87f-8112200e6272/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 58' },
  { id: 59, src: '/api/public/media/images/14689ab0-76b5-40b9-823f-999051b8e7b1/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 59' },
  { id: 60, src: '/api/public/media/images/a1f9ad8e-35dd-4325-8a31-70ebab6c2f47/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 60' },
  { id: 61, src: '/api/public/media/images/2b97bc92-76b0-4cfa-b586-338e408a8bbf/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 61' },
  { id: 62, src: '/api/public/media/images/85b6a9e3-4860-4e8a-b8df-2bf473e814bc/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 62' },
  { id: 63, src: '/api/public/media/images/41b4f2ac-88fd-4ef0-b23f-8bd5514231f4/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 63' },
  { id: 64, src: '/api/public/media/images/4a57dfd6-5d2c-45e7-a944-d8aa32fa65d3/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 64' },
  { id: 65, src: '/api/public/media/images/c1472612-2261-41c8-8652-95150ffe617f/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 65' },
  { id: 66, src: '/api/public/media/images/044db665-4381-4760-9ef8-e0a63655566c/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 66' },
  { id: 67, src: '/api/public/media/images/4700d06a-4ed5-4e22-ba19-0437ae5ef71e/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 67' },
  { id: 68, src: '/api/public/media/images/bfe188f5-dd56-4ed0-8d7a-0d05ea26344e/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 68' },
  { id: 69, src: '/api/public/media/images/b9bd5275-3470-4c54-9932-6ece289c8d0b/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 69' },
  { id: 70, src: '/api/public/media/images/fa6247c6-0b3d-45ce-bdf6-54c8688173c6/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 70' },
  { id: 71, src: '/api/public/media/images/fff96783-6cf2-4b1d-8532-177c0e5f54f5/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 71' },
  { id: 72, src: '/api/public/media/images/06b01d49-76a6-43b4-b8fe-352b0dddfea3/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 72' },
  { id: 73, src: '/api/public/media/images/6ad41579-6276-40c1-92a1-c49b1deac50d/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 73' },
  { id: 74, src: '/api/public/media/images/aba72dff-d787-4736-af25-c7723f4b6076/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 74' },
  { id: 75, src: '/api/public/media/images/9a9aa42d-ca65-452c-80e8-0e27f01e46d4/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 75' },
  { id: 76, src: '/api/public/media/images/6c8cc7e2-7feb-4afb-8f69-4a72c78a7dec/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 76' },
  { id: 77, src: '/api/public/media/images/932f3669-2169-47ea-9921-3cd7680fbdaa/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 77' },
  { id: 78, src: '/api/public/media/images/6f22de58-9fc2-4211-b82e-9f64cbd2db4e/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 78' },
  { id: 79, src: '/api/public/media/images/3f681391-4d32-4bbc-851c-a713c863123c/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 79' },
  { id: 80, src: '/api/public/media/images/b0d09dee-8a87-4c68-af66-430195b2f1fe/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 80' },
  { id: 81, src: '/api/public/media/images/f1203978-1ad0-4af7-b58c-35b04970163c/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 81' },
  { id: 82, src: '/api/public/media/images/77bd10a0-04ed-4989-9591-701241b288ba/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 82' },
  { id: 83, src: '/api/public/media/images/5f566dc0-25cf-45de-9947-5101a462b76d/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 83' },
  { id: 84, src: '/api/public/media/images/7d2fda23-fb18-4260-8f94-2877b616c6d2/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 84' },
  { id: 85, src: '/api/public/media/images/1a4a9f1e-d946-4398-8b75-3742dd855a45/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 85' },
  { id: 86, src: '/api/public/media/images/22c8aa0f-5f1b-4bfe-a941-c548c10f399a/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 86' },
  { id: 87, src: '/api/public/media/images/feaea65b-8c3a-43dc-88c8-78e39c611c22/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 87' },
  { id: 88, src: '/api/public/media/images/cf1c3c16-a776-40b7-80a1-ed2e09913cc5/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 88' },
  { id: 89, src: '/api/public/media/images/35aed957-8571-4249-84a5-ca394bd6c4f9/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 89' },
  { id: 90, src: '/api/public/media/images/5dc9f1ae-2a79-40a1-8c09-6b2f50193ef7/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 90' },
  { id: 91, src: '/api/public/media/images/0486c224-ae4b-49b5-87f9-c00f8b13c68e/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 91' },
  { id: 92, src: '/api/public/media/images/ef8042c4-3726-461c-a17f-60bffc6db8e3/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 92' },
  { id: 93, src: '/api/public/media/images/28126d94-8c07-4898-83e3-712fb7343109/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 93' },
  { id: 94, src: '/api/public/media/images/0ed1e839-66db-4bdd-9052-86110246d595/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 94' },
  { id: 95, src: '/api/public/media/images/7ab86f9c-48ca-429a-b06a-6fdf71fc6bdc/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 95' },
  { id: 96, src: '/api/public/media/images/5ab46765-26e4-409b-8ac9-ec7aa0f71f32/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 96' },
  { id: 97, src: '/api/public/media/images/4eba7a27-f73e-4580-ab1c-b967651198e9/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 97' },
  { id: 98, src: '/api/public/media/images/8a70df6f-c8af-4576-aa3c-63d118441f7f/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 98' },
  { id: 99, src: '/api/public/media/images/eb9c707a-2337-44ed-bb34-5f51f5d9ccd2/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 99' },
  { id: 100, src: '/api/public/media/images/b06b2926-5b09-4feb-b5c5-79c7a2ac3762/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 100' },
  { id: 101, src: '/api/public/media/images/b23feb9c-aa17-4612-ad2c-de83d32ac916/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 101' },
  { id: 102, src: '/api/public/media/images/22901529-ab9c-4b7e-830c-4ebf54a1c2eb/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 102' },
  { id: 103, src: '/api/public/media/images/5722263c-7e7d-4337-9d61-67092e8c2a50/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 103' },
  { id: 104, src: '/api/public/media/images/f061d32f-e94f-4fa1-ad88-e34055ab5f7d/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 104' },
  { id: 105, src: '/api/public/media/images/23ef2fdb-280f-4613-9233-4107c6d25db5/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 105' },
  { id: 106, src: '/api/public/media/images/f2e0d212-2825-4d15-97b9-95232ff813f9/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 106' },
  { id: 107, src: '/api/public/media/images/7f632734-4f30-485a-a845-73678a343364/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 107' },
  { id: 108, src: '/api/public/media/images/eaca23db-5236-4a26-b482-c2282ec91b76/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 108' },
  { id: 109, src: '/api/public/media/images/02170e80-0e45-436f-992a-dcefd371ee56/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 109' },
  { id: 110, src: '/api/public/media/images/8a971ab5-cc79-431d-9f4e-86bd7b8f7d05/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 110' },
  { id: 111, src: '/api/public/media/images/8448b64d-c19b-4b2a-a9fa-921e25ee8ea3/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 111' },
  { id: 112, src: '/api/public/media/images/8a959f79-f519-413e-b3fb-a26d6be0accb/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 112' },
  { id: 113, src: '/api/public/media/images/49e4cf71-797f-4483-a0d8-50e2736e3a8f/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 113' },
  { id: 114, src: '/api/public/media/images/f3884a7b-d56f-4820-9091-d05dcdf1e859/file', alt: 'Rustikli perde modelleri Ankara', title: 'Rustikli Perde 114' }
]

const productAdvantages = [
  'Ahşap ve pirinç rustik çeşitleri ile doğal ve estetik görünüm',
  'Kornişe ihtiyaç duymadan pratik kullanım imkanı',
  'Metal halkalar ile kolay açılıp kapanma özelliği',
  'Klasik ve modern mekanlara uyum sağlayan çok yönlü tasarım',
  'Uzun ömürlü kullanım için kaliteli malzeme ve işçilik'
]

const usageAreas = [
  'Salon ve oturma odaları',
  'Yatak odaları',
  'Çocuk odaları',
  'Ofis ve çalışma alanları',
  'Otel ve butik otel projeleri',
  'Cafe ve restoran mekanları',
  'Klasik ve rustik dekorasyon konseptli projeler',
  'Doğal malzeme tercih edilen mekanlar'
]

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
}

const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ModernPerdePage() {
  const [galleryImages, setGalleryImages] = useState(productImages)
  const [selectedImage, setSelectedImage] = useState(productImages[0])
  const initialHeroCopy = parseProductGalleryHeroCopy(
    useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery'),
    defaultHeroCopy,
  )
  const [heroCopy, setHeroCopy] = useState(initialHeroCopy)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id)

  useEffect(() => {
    let mounted = true

    getPublicProductGallery(PRODUCT_GALLERY_PAGE_KEY, productImages).then((images) => {
      if (!mounted) {
        return
      }

      setGalleryImages(images)
      setSelectedImage((current) => images.find((image) => image.id === current.id) || images[0] || current)
    })

    getPublicProductGalleryHeroCopy(PRODUCT_GALLERY_PAGE_KEY, defaultHeroCopy).then((copy) => {
      if (!mounted) {
        return
      }

      setHeroCopy(copy)
    })

    return () => {
      mounted = false
    }
  }, [])

  const goToPrevious = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
    setSelectedImage(galleryImages[prevIndex])
  }

  const goToNext = () => {
    const nextIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0
    setSelectedImage(galleryImages[nextIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      }
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          goToPrevious()
        }
        if (e.key === 'ArrowRight') {
          goToNext()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentImageIndex])

  return (
    <>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <main className="bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">{heroCopy.eyebrow}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6">
              {heroCopy.title}
              <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                {heroCopy.highlightedTitle}
              </span>
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              {heroCopy.description}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">

            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10">
              <h2 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Ürün Özellikleri
              </h2>

              <div className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Rustik modeller son zamanlarda ev dekorasyonunda oldukça sık tercih edilen perde modelleri arasında
                  yer almaktadır. Rustik ahşap, metal, pirinç vb. halka ve çubuk bağlantıları ile tasarlanan rustik
                  perdeler ile iç dekorasyonda da sofistike bir hava yaratabilirsiniz.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Rustik perdeler her mekanda cafe, ofis ve restoranlarda, yazlık evlerde, dağ evinde, kır evlerinde
                  rahatlıkla kullanılmaktadır. Bunun yanı sıra banyo, mutfakta, salon ve yatak odasında da tercih edilmektedir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Özellikle rustik perdeyi mutfakta kullanacaksanız rengarenk ve çiçekli desenler daha çok uygun olacaktır.
                  Fakat farklı kullanım alanlarına göre değişik tavsiyeler verilebilir. Mesela salonda kullanacaksanız
                  eşyaların rengi ve halı desenleri sizin için daha etkili kriterler olacaktır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Rustik perde modelleri arasından seçim yaparken; eşyalarla perde arasındaki uyumu sağlayabilir,
                  kendinize harika yaşam alanları oluşturabilirsiniz.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Rustikli', 'Ahşap Rustik', 'Pirinç Rustik', 'Metal Halkalar', 'Doğal', 'Estetik', 'Şık', 'Pratik'].map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 backdrop-blur-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/20">
              <h3 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Fiyat Bilgisi
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Rustik perde kullanımında kolaylık sağlanacak en önemli yerler balkonlu odalardır. Daha rahat ve pratik
                bir kolaylık sağlaması açısından balkonlu odalarda rustik perdeler kullanılır. Rustik perde modelleri
                fiyatları, rustik cinsine, kumaş kalitesine ve metreye göre değişiklik göstermektedir.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="tel:+903122417272"
                  className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-black overflow-hidden transition-all duration-300 hover:gap-3 rounded-lg text-sm"
                >
                  <span className="relative z-10 font-medium">Hemen Arayın</span>
                  <svg className="relative z-10 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>

                <Link
                  href="https://wa.me/905325034424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white hover:bg-[#20BA5A] transition-all duration-300 rounded-lg text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="font-medium">WhatsApp</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Ürün Galerisi</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              Rustikli Perde Modelleri
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group"
              >
                <div
                  className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image)
                    setLightboxOpen(true)
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                      <div></div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 flex-shrink-0 ml-4">
                        <svg
                          className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/20">
              <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Ürünün Avantajları
              </h3>

              <ul className="space-y-4">
                {productAdvantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 font-light">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/20">
              <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Kullanım Alanları
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Rustik perde temizliği kumaş seçeneğine göre farklılık gösterir. Rustik perde montajı oldukça kolay bir
                işlemdir. Demir borular ile monte edilebileceği gibi korniş sistemi olan evlerde de kullanılabilir.
              </p>

              <ul className="space-y-4">
                {usageAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 font-light">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-extralight text-white mb-4">
              Rustikli Perde Modelleri Hakkında Sorularınız mı var?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Dilerseniz hemen <strong>0312 241 72 72</strong> no&apos;lu telefondan bize ulaşarak ihtiyacınıza
              uygun rustik perde modelleri hakkında bilgi alabilir ve sipariş verebilirsiniz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="tel:+903122417272"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300 hover:gap-4 rounded-xl"
              >
                <span className="relative z-10 font-medium">0312 241 72 72</span>
                <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              <Link
                href="https://wa.me/905325034424"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white hover:bg-[#20BA5A] transition-all duration-300 rounded-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="font-medium">WhatsApp ile İletişim</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          <motion.div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative h-[80vh] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </>
  )
}
