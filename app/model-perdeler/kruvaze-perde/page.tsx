'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, getProductGalleryDefaultHeroCopy } from '@/lib/productGalleryContent'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-kruvaze-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const canonicalUrl = 'https://pileperde.com.tr/model-perdeler/kruvaze-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'Kruvaze Perde', url: '/model-perdeler/kruvaze-perde' },
]

const productImages = [
  { id: 1, src: '/api/public/media/images/fa4be5de-409b-407c-adc6-44df3d5c712b/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 1' },
  { id: 2, src: '/api/public/media/images/dce04a6e-be28-4194-8662-774d9d20ce54/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 2' },
  { id: 3, src: '/api/public/media/images/c14dc7dc-dd8d-4065-b080-1de98a434238/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 3' },
  { id: 4, src: '/api/public/media/images/26cf4705-b6e8-4991-96d5-ffe45b4ef325/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 4' },
  { id: 5, src: '/api/public/media/images/3225cee7-3802-4d75-8681-c2658af9f4c2/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 5' },
  { id: 6, src: '/api/public/media/images/1bd781bf-49ca-475c-a8ea-23e9ee1726b2/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 6' },
  { id: 7, src: '/api/public/media/images/3fd311f6-fe36-429b-984f-d90cb0f30347/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 7' },
  { id: 8, src: '/api/public/media/images/cb1e3e40-0fe9-4da1-9433-2916e690cb0d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 8' },
  { id: 9, src: '/api/public/media/images/9e7c3529-5824-4b97-8ba0-c794933355b9/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 9' },
  { id: 10, src: '/api/public/media/images/2e677ba0-320a-4eda-9e11-32873ad2b280/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 10' },
  { id: 11, src: '/api/public/media/images/7b5164b6-7096-4996-842a-65e77e40aa9c/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 11' },
  { id: 12, src: '/api/public/media/images/a718d773-134a-4aed-a322-8d298061d938/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 12' },
  { id: 13, src: '/api/public/media/images/cdc988b6-0abd-479d-b718-5703a39134c7/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 13' },
  { id: 14, src: '/api/public/media/images/f3b78764-5a8c-4bd2-968b-714ee26dedb8/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 14' },
  { id: 15, src: '/api/public/media/images/a497f347-4fef-49da-8f04-ebd6996dfa16/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 15' },
  { id: 16, src: '/api/public/media/images/983427e5-34cf-4978-b71d-4c2e04132c4a/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 16' },
  { id: 17, src: '/api/public/media/images/035b6a28-4079-4410-abb0-49543f56012b/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 17' },
  { id: 18, src: '/api/public/media/images/d7a5fef6-bcc6-4883-ae9f-b619c23b119f/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 18' },
  { id: 19, src: '/api/public/media/images/0c3d9f19-3a39-4a96-9716-5a5a9a573d5d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 19' },
  { id: 20, src: '/api/public/media/images/0bd5b8f9-c1bc-4d2b-b9c9-3ce1987b7a70/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 20' },
  { id: 21, src: '/api/public/media/images/8150bb54-0818-4383-a032-86d33b7e791e/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 21' },
  { id: 22, src: '/api/public/media/images/d13e1e48-2c98-4898-a532-4ed7b504c66c/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 22' },
  { id: 23, src: '/api/public/media/images/66a8a913-80b1-401c-949e-8bd8b570f774/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 23' },
  { id: 24, src: '/api/public/media/images/50be82b4-7d69-46d3-8a0b-e3828a9a9a8e/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 24' },
  { id: 25, src: '/api/public/media/images/d8e9a0c2-22c0-4dd4-a8d6-21280fcb41e7/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 25' },
  { id: 26, src: '/api/public/media/images/7797632d-e9b0-423a-bee5-dd4758bec507/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 26' },
  { id: 27, src: '/api/public/media/images/1514bb20-b78c-43b6-9a02-9675d0cd5950/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 27' },
  { id: 28, src: '/api/public/media/images/4fbb21c8-c133-467f-a5ed-f0557a5abd15/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 28' },
  { id: 29, src: '/api/public/media/images/b99db9a5-9a72-4d6c-96de-04babd024313/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 29' },
  { id: 30, src: '/api/public/media/images/b4f32947-745b-4c89-8a29-cdc2fc05b03d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 30' },
  { id: 31, src: '/api/public/media/images/626a5594-591d-4605-899a-c5172a50240f/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 31' },
  { id: 32, src: '/api/public/media/images/36f3c19e-8fde-41e2-995c-eecf7fa3502d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 32' },
  { id: 33, src: '/api/public/media/images/139af014-5fdb-49f1-a22b-37bca805baac/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 33' },
  { id: 34, src: '/api/public/media/images/78361cc4-867f-4d9c-9c06-d1acecd1d04a/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 34' },
  { id: 35, src: '/api/public/media/images/d2d9cf51-26ad-4387-beba-cf50e06b9b85/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 35' },
  { id: 36, src: '/api/public/media/images/941d9f1d-7e6a-435a-bb2c-08d37c75f6b2/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 36' },
  { id: 37, src: '/api/public/media/images/830e9bd8-ce01-4fbd-aa75-57488e280ce4/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 37' },
  { id: 38, src: '/api/public/media/images/79ed3e6e-a6a9-4db6-8bf2-e22c07501beb/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 38' },
  { id: 39, src: '/api/public/media/images/31ea565b-9b18-441e-8bd1-ca3131ac7fe3/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 39' },
  { id: 40, src: '/api/public/media/images/10f854f9-9569-48a9-833d-2340b4f4d140/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 40' },
  { id: 41, src: '/api/public/media/images/54a4b8b3-8fad-419b-a33a-e3530c18b88e/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 41' },
  { id: 42, src: '/api/public/media/images/be349be7-9e0d-4ee4-a9b8-94136b122375/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 42' },
  { id: 43, src: '/api/public/media/images/a65490d5-2b11-4ba2-9a3d-28be2e6fb33d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 43' },
  { id: 44, src: '/api/public/media/images/59cecf43-d77b-437d-8165-ed0d2dfb16f1/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 44' },
  { id: 45, src: '/api/public/media/images/1ac3f669-34f0-483e-9780-cbc268795d78/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 45' },
  { id: 46, src: '/api/public/media/images/d8560f31-ccf7-4624-a3c9-072e67415aac/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 46' },
  { id: 47, src: '/api/public/media/images/5676fdc2-1f5c-4f2a-8bb4-643956fb1821/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 47' },
  { id: 48, src: '/api/public/media/images/66fbc02b-23ac-41b0-b8bd-f70955798510/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 48' },
  { id: 49, src: '/api/public/media/images/24882eb3-2b44-445e-9f43-8ec00ec867e3/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 49' },
  { id: 50, src: '/api/public/media/images/098338df-5cee-44bd-a7a0-d339a6712d50/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 50' },
  { id: 51, src: '/api/public/media/images/acada2c1-3c0a-40e4-ae5b-e07bdbb00d58/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 51' },
  { id: 52, src: '/api/public/media/images/f8c02c55-e3a6-4e34-9869-0e533ea75e97/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 52' },
  { id: 53, src: '/api/public/media/images/d2987c44-3b1f-4af6-a0af-be9430af8c6c/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 53' },
  { id: 54, src: '/api/public/media/images/f54427b4-25c2-4b22-8979-388ef0d4b681/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 54' },
  { id: 55, src: '/api/public/media/images/8077e4f5-fe1e-443b-b387-6a87d487e6f2/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 55' },
  { id: 56, src: '/api/public/media/images/00ca2ed4-ecaf-49ac-9bfc-041a08ef5834/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 56' },
  { id: 57, src: '/api/public/media/images/2f61a0de-fb4a-438f-b805-eae058d3ad3e/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 57' },
  { id: 58, src: '/api/public/media/images/6594276c-6d46-48e4-b902-24e21b9872be/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 58' },
  { id: 59, src: '/api/public/media/images/4f1f3a87-ab94-4843-a3b4-00847d061c63/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 59' },
  { id: 60, src: '/api/public/media/images/b54aeeb5-ad7f-48b9-90ec-3ca9634f1952/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 60' },
  { id: 61, src: '/api/public/media/images/86a5d9fb-cba6-4a1a-b20f-40d4ab6a4c6a/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 61' },
  { id: 62, src: '/api/public/media/images/019cfd13-cea2-411c-acf8-8ff6911b4d22/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 62' },
  { id: 63, src: '/api/public/media/images/3f348d3b-d98d-439b-80e0-5a893b7b2b3b/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 63' },
  { id: 64, src: '/api/public/media/images/2e671ae4-76b1-4036-b3d7-4a52306c6bba/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 64' },
  { id: 65, src: '/api/public/media/images/42fd0e3b-5771-402f-a009-9e1298dec48d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 65' },
  { id: 66, src: '/api/public/media/images/f27488f4-ab58-4e51-b471-fab34b026c7a/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 66' },
  { id: 67, src: '/api/public/media/images/29226c34-de34-43a6-a090-6e970def8efa/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 67' },
  { id: 68, src: '/api/public/media/images/fda1d513-d756-4412-8ed1-917d08a0bb98/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 68' },
  { id: 69, src: '/api/public/media/images/8dd4944f-0c0f-450d-b4dc-a5a5687b3f9f/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 69' },
  { id: 70, src: '/api/public/media/images/b203645b-7b97-4b66-8d6d-f4487e7d8b92/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 70' },
  { id: 71, src: '/api/public/media/images/bd3fd388-a9ac-423c-837d-62c2588f84f1/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 71' },
  { id: 72, src: '/api/public/media/images/d1ef9258-361b-4add-87fb-77c94c1f0355/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 72' },
  { id: 73, src: '/api/public/media/images/27813156-0806-461d-91a2-5dd2702e38fb/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 73' },
  { id: 74, src: '/api/public/media/images/5f36410f-d20f-46f8-b112-a0fc29b60d54/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 74' },
  { id: 75, src: '/api/public/media/images/6859f5cf-9027-4b92-80ad-b7e05c3d6909/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 75' },
  { id: 76, src: '/api/public/media/images/a6fdc5fa-44ce-4e01-86bf-68f666c29e88/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 76' },
  { id: 77, src: '/api/public/media/images/b2ea5fd7-eb98-4828-89d1-bae1f26bb09f/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 77' },
  { id: 78, src: '/api/public/media/images/f7f6a727-65b4-45c9-931b-9f58c3f9f879/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 78' },
  { id: 79, src: '/api/public/media/images/6a89b1d1-6f76-463f-8639-88181d0a3859/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 79' },
  { id: 80, src: '/api/public/media/images/38c7738d-d8ab-4db6-a2be-3d2c2bac961f/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 80' },
  { id: 81, src: '/api/public/media/images/e5038b7d-327a-452a-8145-115ebd962e0f/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 81' },
  { id: 82, src: '/api/public/media/images/c771b7d1-1e88-48ef-9475-285da2173b83/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 82' },
  { id: 83, src: '/api/public/media/images/9abd3e86-81f4-4d0a-9d89-6190473e75c0/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 83' },
  { id: 84, src: '/api/public/media/images/94ab71ad-48d5-4648-89db-2ad6581dcf6c/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 84' },
  { id: 85, src: '/api/public/media/images/636a62c1-5d94-48a8-9968-b2de592b84d6/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 85' },
  { id: 86, src: '/api/public/media/images/30541e6c-5f16-40fb-a066-32d4c9ea851f/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 86' },
  { id: 87, src: '/api/public/media/images/29804b57-bf95-43d7-b909-96c4dfc02a8c/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 87' },
  { id: 88, src: '/api/public/media/images/c73f247d-b50d-40fb-88e8-f230c667da84/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 88' },
  { id: 89, src: '/api/public/media/images/285bbebb-1e4a-47c2-8827-5681d7084707/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 89' },
  { id: 90, src: '/api/public/media/images/3cbe0272-b24a-47c8-baaf-bd8c2b27b214/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 90' },
  { id: 91, src: '/api/public/media/images/9129a2bc-b7fa-46e7-8c90-3eeae1938e7f/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 91' },
  { id: 92, src: '/api/public/media/images/1ca21708-ac97-4800-b19c-2c464f9f6342/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 92' },
  { id: 93, src: '/api/public/media/images/42ed17ed-73a6-4392-85dc-23e1bf648576/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 93' },
  { id: 94, src: '/api/public/media/images/e0de35b3-323e-4e90-aaab-ae1d43748e11/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 94' },
  { id: 95, src: '/api/public/media/images/f13fc9f9-dff0-4977-9f10-0e648e334f99/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 95' },
  { id: 96, src: '/api/public/media/images/1cc98c41-ed26-4e4d-bb7d-92d679bcc6fb/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 96' },
  { id: 97, src: '/api/public/media/images/e0de120d-aa08-4336-af46-9f0bbaf158a2/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 97' },
  { id: 98, src: '/api/public/media/images/0ac8674b-9bd1-4451-8430-db8b7c67105d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 98' },
  { id: 99, src: '/api/public/media/images/42244b59-2581-4f0d-bdf8-889b7c0b91ae/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 99' },
  { id: 100, src: '/api/public/media/images/40067139-0829-4bda-87e7-a940e8638607/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 100' },
  { id: 101, src: '/api/public/media/images/25c7e675-ec49-4daf-8cf3-9f5b7e494407/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 101' },
  { id: 102, src: '/api/public/media/images/847a21ac-4c80-4020-8a96-7d435144fdb3/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 102' },
  { id: 103, src: '/api/public/media/images/d5c49f36-fe1a-4530-ba21-4222eb335c10/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 103' },
  { id: 104, src: '/api/public/media/images/b670ed3e-96f8-43a9-b319-444d5bed94e4/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 104' },
  { id: 105, src: '/api/public/media/images/6ecb3f5c-7b78-4ce4-b707-f5b0c885a612/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 105' },
  { id: 106, src: '/api/public/media/images/282f182f-3d71-4429-a69c-6ab927978654/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 106' },
  { id: 107, src: '/api/public/media/images/5b3554f2-c185-48dc-8468-714ba07c2134/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 107' },
  { id: 108, src: '/api/public/media/images/c756670f-0c4c-42e0-be3b-9bc18ebb97c3/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 108' },
  { id: 109, src: '/api/public/media/images/8922861f-8bb1-4831-9cdf-500b3ae4d63e/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 109' },
  { id: 110, src: '/api/public/media/images/2e10703c-4317-4414-8819-f4f035b55caf/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 110' },
  { id: 111, src: '/api/public/media/images/8bd8a615-5153-4837-b497-c10893ceb418/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 111' },
  { id: 112, src: '/api/public/media/images/cb390c9a-2dc7-4452-b0b1-9b8cd086a71b/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 112' },
  { id: 113, src: '/api/public/media/images/dc54f831-0213-4451-ad9d-b549556d1b4b/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 113' },
  { id: 114, src: '/api/public/media/images/798ec953-80a9-40be-b6a2-1cb7cb5797fd/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 114' },
  { id: 115, src: '/api/public/media/images/924fd03f-c758-4a99-a531-0a9f658bad64/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 115' },
  { id: 116, src: '/api/public/media/images/841d4dc7-e563-4ac2-96a0-206976b545e6/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 116' },
  { id: 117, src: '/api/public/media/images/fd4ee199-322e-490c-9609-3c47835572bf/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 117' },
  { id: 118, src: '/api/public/media/images/850d2c7f-8e9e-4c89-90c8-58b0fb163a75/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 118' },
  { id: 119, src: '/api/public/media/images/4bf3a37a-2c71-492c-a11b-c20c1fcec742/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 119' },
  { id: 120, src: '/api/public/media/images/302f4c70-da0b-4744-b0dd-2e52e412a27d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 120' },
  { id: 121, src: '/api/public/media/images/82e2b8c9-ea1a-4d2e-ad40-7863d3506ae3/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 121' },
  { id: 122, src: '/api/public/media/images/d2bf4180-4522-4f43-a455-76436c04ac85/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 122' },
  { id: 123, src: '/api/public/media/images/58cd278a-fe43-454c-aadf-b22a9de4e975/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 123' },
  { id: 124, src: '/api/public/media/images/2d99fa4f-6518-44b3-acab-6a164e5fcd7e/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 124' },
  { id: 125, src: '/api/public/media/images/0559830b-d0b6-4169-8e17-2a95e5cdb809/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 125' },
  { id: 126, src: '/api/public/media/images/26d97473-0c7d-45bf-bc43-2fc0c6439e9c/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 126' },
  { id: 127, src: '/api/public/media/images/64ec9a41-a6df-4a8b-9111-27918b639a31/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 127' },
  { id: 128, src: '/api/public/media/images/98382a7c-9ad0-4e87-8c34-0335fff35102/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 128' },
  { id: 129, src: '/api/public/media/images/ffbb3f8c-6099-4be4-8880-0c14b611522e/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 129' },
  { id: 130, src: '/api/public/media/images/28ad1cc9-7e02-40e3-a0cc-9064075ae6e2/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 130' },
  { id: 131, src: '/api/public/media/images/cab55890-59cb-468d-a572-a1e1258949fe/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 131' },
  { id: 132, src: '/api/public/media/images/49fa6827-61ba-450d-8f41-ced2757f0b16/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 132' },
  { id: 133, src: '/api/public/media/images/cf8950b0-5524-4f93-b2ce-f464baaa8165/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 133' },
  { id: 134, src: '/api/public/media/images/d6dbdcce-e3e3-4296-b1e1-5a88316bdcd9/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 134' },
  { id: 135, src: '/api/public/media/images/2eb4025e-0899-4259-a42d-6d33c9227821/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 135' },
  { id: 136, src: '/api/public/media/images/33e99a74-2237-48ef-9458-9126edf42eca/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 136' },
  { id: 137, src: '/api/public/media/images/5c8667ad-2d32-4e79-8048-444d7fb281ac/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 137' },
  { id: 138, src: '/api/public/media/images/8886b893-2343-4df0-9023-37478e014a6d/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 138' },
  { id: 139, src: '/api/public/media/images/3b2e637e-7400-497b-ac9d-39b6aab17191/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 139' },
  { id: 140, src: '/api/public/media/images/1d7c5e10-b36a-4b1f-82ca-72c8ff9fda95/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 140' },
  { id: 141, src: '/api/public/media/images/b999fe12-090f-46a2-a7b4-9b0c250f0628/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 141' },
  { id: 142, src: '/api/public/media/images/2d8ef617-5cd4-4cfb-a251-881469c76ebe/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 142' },
  { id: 143, src: '/api/public/media/images/1c6aa573-6fba-4762-a31d-5599ee91f9ec/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 143' },
  { id: 144, src: '/api/public/media/images/bf35b902-5344-4919-84bf-e10c93cff60a/file', alt: 'Kruvaze perde modelleri Ankara', title: 'Kruvaze Perde 144' }
]

const productAdvantages = [
  'Mekanizmalı, mekanizmasız ve yalancı kruvaze modellerinin zengin seçenekleri',
  'İp çekme sistemi ile kolay büzüştürme ve estetik görünüm',
  'Tül perdeler ile mükemmel uyum sağlayan tasarım',
  'Salon, yatak odası ve oturma odalarına zarafet katan görünüm',
  'Stor perde ile kombine kullanım imkanı'
]

const usageAreas = [
  'Salon ve oturma odaları',
  'Yatak odaları',
  'Balkonlu odalar',
  'Ofis ve çalışma alanları',
  'Otel ve butik otel projeleri',
  'Modern dekorasyon konseptli projeler',
  'Tül perde ile kombine kullanım alanları',
  'Stor perde ile birlikte kullanılan mekanlar'
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
  const [heroCopy, setHeroCopy] = useState(defaultHeroCopy)
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
                  Salonlarda, yatak odalarında ve oturma odalarında genelde çok yaygın olarak tercih edilen kruvaze perdelerin 
                  mekanizmalı kruvaze perdeler, mekanizmasız kruvaze perdeler, yalancı kruvaze perdeler şeklinde üç farklı modeli vardır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Mekanizmalı kruvaze perde modellerinde seçmiş olduğunuz tül, düz tül olarak veya dilimli olarak dikilir ve 
                  kornişe asılan bir makara mekanizması ile istenildiğinde ipi çekilerek büzüşen bir perde modelidir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Kruvaze perde modelleri kullanıldıkları yere zarafet kazandıran, estetik olarak göz kamaştırıcı dekorasyonlara 
                  imza atmanızı sağlayan perde modelleridir. Mobilyalar ile uyumlu renklerde seçilen kruvaze perde modelleri hem 
                  evinizin daha zarif olmasını sağlar hem de kruvaze perdenin ışıltısını evinize yansıtır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Kullanışlı kruvaze perdeler, istenilen ölçülere göre dikilebilir. Tül perde üzerinde çok şık ve estetik durur. 
                  Kruvaze perde modelleri, düz tül perdeler için de kullanılabilecek özelliktedir. Özellikle Fransız tül perdeler 
                  ya da güpür tül perdeler ile rahatlıkla kullanılabilir.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Kruvaze', 'Mekanizmalı', 'Mekanizmasız', 'Yalancı Kruvaze', 'İki Kanat', 'Estetik', 'Zarif', 'Pratik'].map((feature) => (
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
                Kruvaze perde temizliği; çamaşır makinanızın yıkama kapasitesine göre yapılabilir. Örneğin; 5-6 kg kapasiteli 
                çamaşır makinesinde kruvaze perde yıkanmaz. Minimum 8-10 kg arası olması gerekir. Kruvaze perde fiyatları, 
                model türüne, kumaş kalitesine ve metreye göre değişiklik göstermektedir.
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
              Kruvaze Perde Modelleri
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
                Yalancı kruvaze perde; kruvaze perdelerin bir başka modeli de yalan kruvaze perdelerdir. Bu perdelerde tül ile 
                dikim yer almaz. Ayrıca satılır ve bunun yanında kornişe bağlı olan kruvaze perde özelliği taşır. Kruvaze perdelere 
                benziyor olsa da bu perde modelleri içerik olarak kruvaze perde değildir.
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
              Kruvaze Perde Modelleri Hakkında Sorularınız mı var?
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
