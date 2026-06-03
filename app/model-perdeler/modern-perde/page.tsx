'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery } from '@/lib/productGalleryContent'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-modern-perde'

const productImages = [
  { id: 1, src: '/api/public/media/images/8c0da342-dfe5-422c-8ef5-6279fd76976e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 1' },
  { id: 2, src: '/api/public/media/images/e2adb71a-89b6-48ff-919d-682602abef0f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 2' },
  { id: 3, src: '/api/public/media/images/fe9ccaea-0ea6-49c8-bc90-5d1cecd36cea/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 3' },
  { id: 4, src: '/api/public/media/images/2a836e5a-261f-4f63-b1af-f3039126bb3c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 4' },
  { id: 5, src: '/api/public/media/images/4eaaabae-7acf-4b62-81a0-31361000f439/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 5' },
  { id: 6, src: '/api/public/media/images/7033012f-f127-4e40-8124-8b1c91890a2d/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 6' },
  { id: 7, src: '/api/public/media/images/c6752023-be34-4717-b5da-a3d2e4121b95/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 7' },
  { id: 8, src: '/api/public/media/images/0e96c36e-3e06-47c3-b21d-f1e2df58f3a0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 8' },
  { id: 9, src: '/api/public/media/images/5e68e10e-2fca-450b-b31c-7458cabf1eb1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 9' },
  { id: 10, src: '/api/public/media/images/3b9eda1c-c592-4436-b93f-b3cf01090e16/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 10' },
  { id: 11, src: '/api/public/media/images/33443787-2425-4ce4-8df7-99ecc7c0856c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 11' },
  { id: 12, src: '/api/public/media/images/d70ef178-4553-4734-b023-80b297f1e695/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 12' },
  { id: 13, src: '/api/public/media/images/ad8ecdf9-1a8b-4107-8056-e99eb0bda37a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 13' },
  { id: 14, src: '/api/public/media/images/742632f7-7b00-470d-944e-5bad03aefbbf/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 14' },
  { id: 15, src: '/api/public/media/images/a2a46f3f-43b2-4799-9cfc-af03a3dbb049/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 15' },
  { id: 16, src: '/api/public/media/images/68df8fe2-fe30-4414-8537-2de9092591d6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 16' },
  { id: 17, src: '/api/public/media/images/f4ff612d-dee5-4d41-bc0f-c7dafdf768e6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 17' },
  { id: 18, src: '/api/public/media/images/5067a23b-df41-47e8-927f-f48bbc2ad855/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 18' },
  { id: 19, src: '/api/public/media/images/aa11e6c4-c877-4926-9708-33dcf12fa915/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 19' },
  { id: 20, src: '/api/public/media/images/4c778c74-c8e6-4aea-b9c0-86e724ef409c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 20' },
  { id: 21, src: '/api/public/media/images/bdee6e56-2453-4c5e-923a-a7e7b40e42d4/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 21' },
  { id: 22, src: '/api/public/media/images/afd7bda6-f7d7-4e9a-a2b8-69bc5ac9b1d6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 22' },
  { id: 23, src: '/api/public/media/images/5c8c50a3-3839-4822-b3b9-aecf2e363dda/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 23' },
  { id: 24, src: '/api/public/media/images/de196840-d779-4fae-9b84-9b1361ad5ef6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 24' },
  { id: 25, src: '/api/public/media/images/d82e14b9-d3e3-48f4-800e-3fd15521cddf/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 25' },
  { id: 26, src: '/api/public/media/images/3fed3f74-d9c9-4f2a-9d71-9321f9feb8ff/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 26' },
  { id: 27, src: '/api/public/media/images/7f560f0e-44bf-43d0-8a8a-c1544b8cc472/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 27' },
  { id: 28, src: '/api/public/media/images/02604362-bd30-4b16-b9bf-fea7985b6cab/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 28' },
  { id: 29, src: '/api/public/media/images/9ea16f8a-193a-453b-951c-ec66125910a5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 29' },
  { id: 30, src: '/api/public/media/images/07ec5a36-c2ee-401d-9e78-c8e0827dcad6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 30' },
  { id: 31, src: '/api/public/media/images/4bd2e755-d756-4117-a971-63b992f4077e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 31' },
  { id: 32, src: '/api/public/media/images/bc49599f-3559-4d42-a8b2-8ea68653e452/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 32' },
  { id: 33, src: '/api/public/media/images/701c7806-e639-4dad-b4bb-a58c25ca4451/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 33' },
  { id: 34, src: '/api/public/media/images/909bf1dc-56a1-4343-aff4-950ddf1fed04/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 34' },
  { id: 35, src: '/api/public/media/images/7da89a69-193d-438f-a477-80db041b5e73/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 35' },
  { id: 36, src: '/api/public/media/images/ca3f0e3d-0dc9-4571-9866-ea0685846ee1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 36' },
  { id: 37, src: '/api/public/media/images/46cc2a06-2829-49eb-a5ea-bae992c2ba6c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 37' },
  { id: 38, src: '/api/public/media/images/e8ad2ebe-87c2-4c0e-98a0-d235749957a0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 38' },
  { id: 39, src: '/api/public/media/images/f6db8ed7-90c1-4f86-99b8-c1a40fad5419/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 39' },
  { id: 40, src: '/api/public/media/images/0fda69ad-a5ba-4f66-a1e7-512cc9685f5c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 40' },
  { id: 41, src: '/api/public/media/images/857ccbb2-100d-446f-ac5d-f6e85d34337a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 41' },
  { id: 42, src: '/api/public/media/images/8f4c10df-307a-42b3-94d4-6abb15c8565f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 42' },
  { id: 43, src: '/api/public/media/images/a0266955-26e0-4784-bd18-721f0262eb3c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 43' },
  { id: 44, src: '/api/public/media/images/b36b6167-733f-4d6a-8d58-1927eaa79ebc/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 44' },
  { id: 45, src: '/api/public/media/images/5f831feb-c9ba-4ad3-bb84-cd36d0a3b610/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 45' },
  { id: 46, src: '/api/public/media/images/283eef2d-c7ec-4262-b551-559007c07dae/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 46' },
  { id: 47, src: '/api/public/media/images/c9aeca9f-8569-489e-996b-630d27bf8b86/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 47' },
  { id: 48, src: '/api/public/media/images/16c3d676-8321-41d8-bad3-e9af166cd0f0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 48' },
  { id: 49, src: '/api/public/media/images/8220e51d-3061-4ea3-9204-50d99a13f6d9/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 49' },
  { id: 50, src: '/api/public/media/images/5db12182-316c-49e1-8d29-cdff2ff12df8/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 50' },
  { id: 51, src: '/api/public/media/images/1157a615-1d70-445e-ab07-f188184d4765/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 51' },
  { id: 52, src: '/api/public/media/images/96c031b4-2023-4676-91a7-ce97e6942ae7/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 52' },
  { id: 53, src: '/api/public/media/images/8b78ba19-2861-41d6-8805-eadffdc4a2ea/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 53' },
  { id: 54, src: '/api/public/media/images/a430fe17-4cea-47e0-97a0-82c1d04e1edf/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 54' },
  { id: 55, src: '/api/public/media/images/31411759-c104-47a0-b9e2-af433eb43294/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 55' },
  { id: 56, src: '/api/public/media/images/8cddb8fd-1cfb-4ae7-83d5-2dc498c66416/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 56' },
  { id: 57, src: '/api/public/media/images/ff491bb6-c5fa-4277-9a9f-bdd157c79571/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 57' },
  { id: 58, src: '/api/public/media/images/1cc50bcd-37e8-4c85-8496-0358f3313ab5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 58' },
  { id: 59, src: '/api/public/media/images/e19360c3-91ff-4ccc-b449-1d13cd742836/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 59' },
  { id: 60, src: '/api/public/media/images/93dcb856-8a8f-4689-8836-12d517a1984c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 60' },
  { id: 61, src: '/api/public/media/images/c69e2a01-fda4-444e-af12-dcb73fd48a2f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 61' },
  { id: 62, src: '/api/public/media/images/0974c390-b9a0-4a0c-acf8-917625fce1f9/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 62' },
  { id: 63, src: '/api/public/media/images/35cb23b7-8c70-4426-8300-75fe593e7d64/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 63' },
  { id: 64, src: '/api/public/media/images/7a22b868-614b-413f-b145-52669d03202a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 64' },
  { id: 65, src: '/api/public/media/images/d9bba627-6bc0-4b10-9f8a-d3d038a8a724/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 65' },
  { id: 66, src: '/api/public/media/images/3059fb77-6485-47e0-956f-543ae9676a28/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 66' },
  { id: 67, src: '/api/public/media/images/68f49626-fab6-4c2a-a3e6-268c2bc05448/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 67' },
  { id: 68, src: '/api/public/media/images/dae726aa-815d-4033-a23f-8bb9229944df/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 68' },
  { id: 69, src: '/api/public/media/images/a1e66cb9-671d-48ee-bffa-f5d3fe42cf42/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 69' },
  { id: 70, src: '/api/public/media/images/3bb9da6e-74fc-4a84-85bc-6bea0c117868/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 70' },
  { id: 71, src: '/api/public/media/images/f9709aa7-eb8c-4275-8945-fff87ae5270b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 71' },
  { id: 72, src: '/api/public/media/images/b03bba3c-e439-4288-b1ac-581f3c9fe007/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 72' },
  { id: 73, src: '/api/public/media/images/77cc2244-0cfe-458b-9841-92ee496e272f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 73' },
  { id: 74, src: '/api/public/media/images/add739f3-5c7b-4e7b-a60d-d0cdaf55f7e3/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 74' },
  { id: 75, src: '/api/public/media/images/a3de957e-c44c-4027-a494-034989a9b083/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 75' },
  { id: 76, src: '/api/public/media/images/4c0690ef-8e3e-4898-a2e5-ad8f128fb2c0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 76' },
  { id: 77, src: '/api/public/media/images/6cc528b4-a7aa-4192-89a9-28a84b6c5483/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 77' },
  { id: 78, src: '/api/public/media/images/33f50640-c696-44ff-b7f2-81349ec0a86b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 78' },
  { id: 79, src: '/api/public/media/images/5d72f20c-a557-4d2e-b9a1-25b5282727f5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 79' },
  { id: 80, src: '/api/public/media/images/dac3f749-29af-4ba3-8325-0ca6921ac0e6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 80' },
  { id: 81, src: '/api/public/media/images/49a5fea6-c04c-4577-8dfb-b11857896771/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 81' },
  { id: 82, src: '/api/public/media/images/4f4171bf-14a3-40d7-907e-395553b10bd0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 82' },
  { id: 83, src: '/api/public/media/images/cf803fc7-98ab-435f-88ba-4b4595db910c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 83' },
  { id: 84, src: '/api/public/media/images/9f2343b3-94cb-4164-9beb-c8a4876b7821/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 84' },
  { id: 85, src: '/api/public/media/images/1e0e38a7-920e-4b2d-8ade-9bbd0f17523a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 85' },
  { id: 86, src: '/api/public/media/images/ad60fed3-12ed-4dd5-8441-c17488042dc6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 86' },
  { id: 87, src: '/api/public/media/images/8974974a-846f-4008-9f34-1c22a4b95ba3/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 87' },
  { id: 88, src: '/api/public/media/images/f1597c3f-9036-4bc0-acf2-eb40af65c811/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 88' },
  { id: 89, src: '/api/public/media/images/54befe66-7520-47a3-ba0b-91c6cc2e816a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 89' },
  { id: 90, src: '/api/public/media/images/6352ef76-abd8-4cf1-a575-71d5343726c9/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 90' },
  { id: 91, src: '/api/public/media/images/661b20f9-046d-482e-b823-835a7d6c2a46/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 91' },
  { id: 92, src: '/api/public/media/images/5dbae2c3-fabf-4c52-9f1d-5ed5ac5b61c4/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 92' },
  { id: 93, src: '/api/public/media/images/32a27c1b-5d53-4b7b-9874-9d79cc1d5676/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 93' },
  { id: 94, src: '/api/public/media/images/4d1f32b1-ff31-4da6-9a4f-2e2597f8ceb9/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 94' },
  { id: 95, src: '/api/public/media/images/e6329639-0cbc-4653-b21e-7aacce4938da/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 95' },
  { id: 96, src: '/api/public/media/images/73cdd105-9565-485c-a1c9-2c52d7bf2c3d/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 96' },
  { id: 97, src: '/api/public/media/images/695504e9-5160-4ac7-a771-68d3d37671d1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 97' },
  { id: 98, src: '/api/public/media/images/89f3f8c5-27b6-4424-afb7-26edb97ef0e1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 98' },
  { id: 99, src: '/api/public/media/images/f7ecf51c-4e3c-438f-9ff2-98b91e2c6021/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 99' },
  { id: 100, src: '/api/public/media/images/6735eba8-57a3-4e49-b6b7-ece1eb28e5cc/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 100' },
  { id: 101, src: '/api/public/media/images/92aa46f2-b05f-4900-b450-035f67a84006/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 101' },
  { id: 102, src: '/api/public/media/images/ae99540d-20e4-43cb-bc3a-6f077cab13e8/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 102' },
  { id: 103, src: '/api/public/media/images/d1aef8bb-e607-434d-be00-6344ab2a83f3/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 103' },
  { id: 104, src: '/api/public/media/images/93f99ee3-648a-41e4-a26a-9016052bed7e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 104' },
  { id: 105, src: '/api/public/media/images/0e031aa8-e04c-40e8-b4dc-20bca882185b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 105' },
  { id: 106, src: '/api/public/media/images/3ebd9485-19ee-4f7b-b52d-e6ceefaede78/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 106' },
  { id: 107, src: '/api/public/media/images/24d22e70-6beb-492a-8232-fe454ccf66b7/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 107' },
  { id: 108, src: '/api/public/media/images/dd514825-8948-4015-ab01-c7734ffa4fde/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 108' },
  { id: 109, src: '/api/public/media/images/05ffe061-4abc-4815-b322-9449b958d90b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 109' },
  { id: 110, src: '/api/public/media/images/4501f884-7784-4b0e-a008-e179aaf0e8bd/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 110' },
  { id: 111, src: '/api/public/media/images/73a0e1e4-fb7e-4783-b721-a79f6ce5e09a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 111' },
  { id: 112, src: '/api/public/media/images/f8c9a3c2-d62b-4efe-81ca-d82886dd2928/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 112' },
  { id: 113, src: '/api/public/media/images/62bdcaed-ec18-446f-8d9f-43a896f5e54f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 113' },
  { id: 114, src: '/api/public/media/images/68d85a9e-d42b-4bed-85c7-e58db652f95c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 114' },
  { id: 115, src: '/api/public/media/images/b2c9b77a-8e19-4f70-be4d-75fa98734055/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 115' },
  { id: 116, src: '/api/public/media/images/3ef5835c-4e53-48e5-8280-2df05a611f7f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 116' },
  { id: 117, src: '/api/public/media/images/798c4d5e-d3ad-4515-b69b-c5e198f7be86/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 117' },
  { id: 118, src: '/api/public/media/images/bdb21c79-5e38-4980-9799-3bf5f8bf23a6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 118' },
  { id: 119, src: '/api/public/media/images/cd1099ec-be56-499a-9ae0-453864194710/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 119' },
  { id: 120, src: '/api/public/media/images/f639eb39-2d9d-4477-bdb0-8d1328c0d49d/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 120' },
  { id: 121, src: '/api/public/media/images/8ce76480-8cfe-4c68-a3a6-82f971766a19/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 121' },
  { id: 122, src: '/api/public/media/images/80e37aa8-5c42-4b11-9734-fbb13d6227eb/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 122' },
  { id: 123, src: '/api/public/media/images/a5c3c5da-6598-4aba-a4bf-66c3fbd1d029/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 123' },
  { id: 124, src: '/api/public/media/images/2a5cd5fb-bfde-4cc8-b195-52474f0b7609/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 124' },
  { id: 125, src: '/api/public/media/images/3da19092-861a-4bf2-97e0-a5d9b0426fa3/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 125' },
  { id: 126, src: '/api/public/media/images/45278d12-7ca8-49d0-9fd7-e6bad3dcbffe/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 126' },
  { id: 127, src: '/api/public/media/images/b01f7451-c657-473a-96c8-f7a23fcf083f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 127' },
  { id: 128, src: '/api/public/media/images/e3d8d2fe-4569-4936-8316-d21f50c78a0c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 128' },
  { id: 129, src: '/api/public/media/images/460ca31d-c3ca-445c-b524-7383591e0fb7/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 129' },
  { id: 130, src: '/api/public/media/images/4a77f7b1-c21a-4f26-b6d4-b259d8bcd3af/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 130' },
  { id: 131, src: '/api/public/media/images/8d79b279-a03f-454b-9a28-37b59c467fa0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 131' },
  { id: 132, src: '/api/public/media/images/20eb9586-39ce-4931-beeb-25f5e496298f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 132' },
  { id: 133, src: '/api/public/media/images/59088ce6-c0e1-4521-ab9c-b833cb0c7c7a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 133' },
  { id: 134, src: '/api/public/media/images/3e8815c0-2cda-439e-8888-9f6bbfd34911/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 134' },
  { id: 135, src: '/api/public/media/images/5a3ded19-40f0-4a41-b420-5b7771537fe2/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 135' },
  { id: 136, src: '/api/public/media/images/de513cb5-c999-4dcf-bf6f-5e31e162bb2f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 136' },
  { id: 137, src: '/api/public/media/images/05710219-46ae-4cfb-9b06-88fc7e23dd2a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 137' },
  { id: 138, src: '/api/public/media/images/e1a974b2-c2e7-41a5-9ddf-4bcc8127937b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 138' },
  { id: 139, src: '/api/public/media/images/5a0ad393-b8ee-4668-8874-86137820c425/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 139' },
  { id: 140, src: '/api/public/media/images/bf9eea60-bf0b-4c49-bc5d-2c0ad6bc8b72/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 140' },
  { id: 141, src: '/api/public/media/images/7d0b103b-5aca-46e5-b6fc-92f0fc98c172/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 141' },
  { id: 142, src: '/api/public/media/images/a1d2fbb5-6749-4e01-8641-bcc2ffd395f1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 142' },
  { id: 143, src: '/api/public/media/images/9b9aa119-f489-4e8e-968d-57aa8c460e1a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 143' },
  { id: 144, src: '/api/public/media/images/1a018c55-f015-4755-b271-75b452793c55/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 144' },
  { id: 145, src: '/api/public/media/images/9aae09a6-21b2-46ae-a9b5-10cb779988d3/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 145' },
  { id: 146, src: '/api/public/media/images/525c5a6e-2681-451c-8160-ceeb165b2352/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 146' },
  { id: 147, src: '/api/public/media/images/c43c8862-c1a0-4627-9b94-32bc2575c041/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 147' },
  { id: 148, src: '/api/public/media/images/5797b830-7f3f-4d3c-954d-efc8736a1d72/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 148' },
  { id: 149, src: '/api/public/media/images/a1c04d68-a837-4b2b-8b01-f68755452b28/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 149' },
  { id: 150, src: '/api/public/media/images/e576178b-b341-4e00-9356-fff0db8149ec/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 150' },
  { id: 151, src: '/api/public/media/images/187145ab-6ee9-45ec-8734-cf9e5b19d62c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 151' },
  { id: 152, src: '/api/public/media/images/d6a6a3da-48d1-42ed-9e7b-9d6b4a34ce9f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 152' },
  { id: 153, src: '/api/public/media/images/80ad020c-4e55-4157-84d4-c15d42431c96/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 153' },
  { id: 154, src: '/api/public/media/images/63867573-7d6f-455d-894a-dc7769a9877f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 154' },
  { id: 155, src: '/api/public/media/images/d46ee6fd-f368-4dc3-b3a5-843967b10640/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 155' },
  { id: 156, src: '/api/public/media/images/e8aefd0a-768f-459c-8cb9-388eef9e3ca0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 156' },
  { id: 157, src: '/api/public/media/images/52c07337-36d4-440f-9194-92fba1f193a1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 157' },
  { id: 158, src: '/api/public/media/images/62c0c9b6-fbbc-4c31-963f-468ecb1bd196/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 158' },
  { id: 159, src: '/api/public/media/images/b841110d-5d4a-46e1-93e6-331f07b857ff/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 159' },
  { id: 160, src: '/api/public/media/images/61fa6b4c-05a8-4419-bdbc-0d5e74b74550/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 160' },
  { id: 161, src: '/api/public/media/images/2040a89d-9148-4807-8a18-155a720f560e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 161' },
  { id: 162, src: '/api/public/media/images/4fb8da22-d07f-45c1-91e9-3a3d6e3123af/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 162' },
  { id: 163, src: '/api/public/media/images/9d70d5d1-2dba-41cb-95bd-a22269f83030/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 163' },
  { id: 164, src: '/api/public/media/images/58608ae4-2fe3-4198-85dc-a338e053711c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 164' },
  { id: 165, src: '/api/public/media/images/0086cbeb-03ea-428d-9c06-974d2d843e0b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 165' },
  { id: 166, src: '/api/public/media/images/ec0f4689-6bd4-4c2b-aad6-075926086919/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 166' },
  { id: 167, src: '/api/public/media/images/c0f05f3d-5968-429c-8818-dffc432d9def/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 167' },
  { id: 168, src: '/api/public/media/images/8d6894eb-00fa-4995-9a58-31d01b0803f6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 168' },
  { id: 169, src: '/api/public/media/images/0071fa50-5c25-4fb4-89c9-bfa41cbb82d7/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 169' },
  { id: 170, src: '/api/public/media/images/9b0e9398-1d29-43c4-b263-61637eb1003c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 170' },
  { id: 171, src: '/api/public/media/images/880ff9a1-260c-4387-b53a-d4dd975737a6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 171' },
  { id: 172, src: '/api/public/media/images/f1623f57-7821-4316-b3b1-4378fd8a2420/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 172' },
  { id: 173, src: '/api/public/media/images/48454e14-ac25-4d10-9d86-3c96bbdceb6b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 173' },
  { id: 174, src: '/api/public/media/images/67cda45d-78da-474e-928f-c26c842085d5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 174' },
  { id: 175, src: '/api/public/media/images/8d7081cd-bca5-4d0b-a373-b3c17b90e9b5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 175' },
  { id: 176, src: '/api/public/media/images/22823680-aa65-4987-946a-20270c43b81b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 176' },
  { id: 177, src: '/api/public/media/images/a5a6e8e3-2f4b-4ec1-b43a-398567cebe78/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 177' },
  { id: 178, src: '/api/public/media/images/6fdb8eed-dcc1-4236-8bab-f8adcb2ca93a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 178' },
  { id: 179, src: '/api/public/media/images/07b1974c-45ba-4a96-b011-9803ffeb8ff7/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 179' },
  { id: 180, src: '/api/public/media/images/3959170b-ef44-460b-ba02-0cd7f97952c1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 180' },
  { id: 181, src: '/api/public/media/images/c7ca48e4-d7f9-461e-a437-dafaf7e81dd6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 181' },
  { id: 182, src: '/api/public/media/images/77f3b35f-b40a-48b5-a76d-2f2fb427645d/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 182' },
  { id: 183, src: '/api/public/media/images/41347cb5-23b5-4193-8da9-72d26448c760/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 183' },
  { id: 184, src: '/api/public/media/images/e80ba687-d038-470f-88af-a0a49ac8f2ce/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 184' },
  { id: 185, src: '/api/public/media/images/93597a59-5ad6-4934-8360-a11455cc487a/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 185' },
  { id: 186, src: '/api/public/media/images/7a826500-7ee0-4392-b70b-9644f4a0956c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 186' },
  { id: 187, src: '/api/public/media/images/b6939e9f-82d1-42e1-b075-ceb94beac8b6/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 187' },
  { id: 188, src: '/api/public/media/images/409c9550-57ef-4298-a23c-db565e7d1ccb/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 188' },
  { id: 189, src: '/api/public/media/images/f1135088-4570-4761-bfd6-bca80a3c62ef/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 189' },
  { id: 190, src: '/api/public/media/images/404ced3f-dc8c-4e74-a5f6-2f0e7e801891/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 190' },
  { id: 191, src: '/api/public/media/images/9497532e-f9cf-438e-bfd9-7898ce6028bc/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 191' },
  { id: 192, src: '/api/public/media/images/305a3d2f-b210-46c9-bc97-2f6730751084/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 192' },
  { id: 193, src: '/api/public/media/images/3b160ceb-d4eb-4730-8ccc-41dd31a2f9e0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 193' },
  { id: 194, src: '/api/public/media/images/ceef6d70-8044-4afd-b724-232ca02d8034/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 194' },
  { id: 195, src: '/api/public/media/images/c4f276b1-3ab9-4a08-8878-5530cdb155ba/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 195' },
  { id: 196, src: '/api/public/media/images/cb4b09c3-b41a-4bae-a144-7eaa3a073785/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 196' },
  { id: 197, src: '/api/public/media/images/98dea521-f380-4b5b-94d9-c25bbf5a5cec/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 197' },
  { id: 198, src: '/api/public/media/images/a5cce894-247e-4d48-8f77-f3cb1d55fa17/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 198' },
  { id: 199, src: '/api/public/media/images/397947d4-0563-48f7-ac1a-adf6caf5f52b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 199' },
  { id: 200, src: '/api/public/media/images/b57b2b9e-3d8c-4072-8812-18302cd4de46/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 200' },
  { id: 201, src: '/api/public/media/images/c363de46-6fe2-47a9-b09b-474133b280b5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 201' },
  { id: 202, src: '/api/public/media/images/50c83e65-0316-4380-9d08-39bec38153c1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 202' },
  { id: 203, src: '/api/public/media/images/ef394ed7-e76c-46a6-8f32-5dcfc9a37a3c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 203' },
  { id: 204, src: '/api/public/media/images/68fdbf31-9b9a-47d8-b6c7-02e88d5bba44/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 204' },
  { id: 205, src: '/api/public/media/images/3dda7413-bbe2-4951-9f63-664c27f06ffe/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 205' },
  { id: 206, src: '/api/public/media/images/ce57f00f-3c89-4fd8-b89e-80cd770eacd0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 206' },
  { id: 207, src: '/api/public/media/images/096d809a-5358-481d-85df-e802d5776a4b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 207' },
  { id: 208, src: '/api/public/media/images/d287ea81-fdec-4ef2-bdfb-73092a818e83/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 208' },
  { id: 209, src: '/api/public/media/images/16844e99-30b9-4840-ac0c-d6e1f4b29b39/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 209' },
  { id: 210, src: '/api/public/media/images/4102cda2-1e25-47e1-ba94-b05961d8805e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 210' },
  { id: 211, src: '/api/public/media/images/c947c96f-92fd-4ac4-ac85-180d9d91168b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 211' },
  { id: 212, src: '/api/public/media/images/7ec472bd-9047-4b7f-ab30-1ee5e2e3a53c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 212' },
  { id: 213, src: '/api/public/media/images/8a19ed0f-10c2-480e-b996-aa59eae77c2e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 213' },
  { id: 214, src: '/api/public/media/images/f6fb9071-215c-44dc-8172-8facebbfbd73/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 214' },
  { id: 215, src: '/api/public/media/images/2a98c720-2566-45ab-8570-4db5b4a3dcef/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 215' },
  { id: 216, src: '/api/public/media/images/7a1c048e-361a-4969-945a-9cf8ed79b6ec/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 216' },
  { id: 217, src: '/api/public/media/images/1d099224-62f8-4c02-a1a2-b86960379abe/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 217' },
  { id: 218, src: '/api/public/media/images/f3a5d091-c8e0-41e8-8c34-4df35a94703e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 218' },
  { id: 219, src: '/api/public/media/images/9afe0d6e-6ff7-4dd9-9aed-af2dc6f95bb4/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 219' },
  { id: 220, src: '/api/public/media/images/94c451fd-d98b-4f8f-bc80-ba1f0b63a6ac/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 220' },
  { id: 221, src: '/api/public/media/images/a8ab710a-b426-4468-b12c-e690835e7373/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 221' },
  { id: 222, src: '/api/public/media/images/6960b735-6387-43e8-8437-f581ac000cae/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 222' },
  { id: 223, src: '/api/public/media/images/d59131bb-9626-4b1e-9ac0-0ba4079ffcf1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 223' },
  { id: 224, src: '/api/public/media/images/ef3d3421-2b1c-4d90-97e3-ad0a28dc4483/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 224' },
  { id: 225, src: '/api/public/media/images/99b757a6-3708-43df-b9e2-c9067dd8a3f1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 225' },
  { id: 226, src: '/api/public/media/images/93bc2d32-c416-44a6-af6e-3597a6b5c065/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 226' },
  { id: 227, src: '/api/public/media/images/757c5b99-59a2-4f44-9020-f54f1b713477/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 227' },
  { id: 228, src: '/api/public/media/images/e3122f27-cbce-4636-9027-ba4658249821/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 228' },
  { id: 229, src: '/api/public/media/images/a02f4b35-3682-48ce-9620-e09daa1caff8/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 229' },
  { id: 230, src: '/api/public/media/images/839a5b36-01b7-4291-a952-ae631579c8ea/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 230' },
  { id: 231, src: '/api/public/media/images/b37f5d8f-2e7b-4f3e-a083-86fce18ef5e4/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 231' },
  { id: 232, src: '/api/public/media/images/7d350d97-0f80-4e83-8674-5f4c23c89a56/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 232' },
  { id: 233, src: '/api/public/media/images/de2826e7-7454-4dfb-b425-5401b16137c5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 233' },
  { id: 234, src: '/api/public/media/images/4cf8a15c-0ac5-44d5-9c64-ed1c4c45bc6d/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 234' },
  { id: 235, src: '/api/public/media/images/73532077-b69e-4c00-b880-b2c91082fadc/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 235' },
  { id: 236, src: '/api/public/media/images/8cc9c8d4-b6a4-45eb-9161-064ffaf7a3a2/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 236' },
  { id: 237, src: '/api/public/media/images/c88a8908-0920-4ef8-a5cd-49582336c1d1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 237' },
  { id: 238, src: '/api/public/media/images/18428d25-f7a2-4845-964d-a0a88b8223c2/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 238' },
  { id: 239, src: '/api/public/media/images/c5e6f848-8713-4b61-b26a-163e0d165e7b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 239' },
  { id: 240, src: '/api/public/media/images/befa7808-efb7-4af7-8155-3effff504e05/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 240' },
  { id: 241, src: '/api/public/media/images/265ca043-7dbe-42b4-87ca-251d75958b74/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 241' },
  { id: 242, src: '/api/public/media/images/d0c14d2d-5691-420a-b811-5a6e147a92b0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 242' },
  { id: 243, src: '/api/public/media/images/02c2e009-d5e2-4b6b-a77c-7ad5316b16fe/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 243' },
  { id: 244, src: '/api/public/media/images/c8d9d1b3-e4fd-46b0-a669-881d7ab16933/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 244' },
  { id: 245, src: '/api/public/media/images/3d98d8d4-21ca-4509-aca4-88306f26a993/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 245' },
  { id: 246, src: '/api/public/media/images/254b165d-684c-459f-a8a3-830b8e4163a3/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 246' },
  { id: 247, src: '/api/public/media/images/21507eea-3d08-4264-b625-f61cc76f4575/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 247' },
  { id: 248, src: '/api/public/media/images/bfe3e862-614a-4974-ad84-89b42d187765/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 248' },
  { id: 249, src: '/api/public/media/images/2cd8fd66-c28e-4e58-b0bf-bdd141dbe856/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 249' },
  { id: 250, src: '/api/public/media/images/883f234c-dd01-45cc-846a-afd6f3bb331c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 250' },
  { id: 251, src: '/api/public/media/images/73b3ff1c-7c38-4c01-830e-beba09b229b1/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 251' },
  { id: 252, src: '/api/public/media/images/f7fe9a75-adc9-4301-8358-327320b2f1ef/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 252' },
  { id: 253, src: '/api/public/media/images/f7323443-5dcb-4632-8d50-648b5c363df9/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 253' },
  { id: 254, src: '/api/public/media/images/b59e69a1-397a-4762-a11b-dc2fcae9a61c/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 254' },
  { id: 255, src: '/api/public/media/images/18d74736-a848-438a-8465-3c48ecf18a9b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 255' },
  { id: 256, src: '/api/public/media/images/99ca8f19-04c0-4418-815f-97a646d831c4/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 256' },
  { id: 257, src: '/api/public/media/images/50ab2a00-baec-44f6-ba6c-0b455cdcaae0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 257' },
  { id: 258, src: '/api/public/media/images/5d820987-b133-42ea-8e3f-9afe24ac783d/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 258' },
  { id: 259, src: '/api/public/media/images/6434f684-f4a2-40f5-b6c1-3951665687f0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 259' },
  { id: 260, src: '/api/public/media/images/eaad67cb-e1ec-4349-8044-b4625d908e93/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 260' },
  { id: 261, src: '/api/public/media/images/052b2f07-8fbe-4f85-8af1-76d3714cef24/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 261' },
  { id: 262, src: '/api/public/media/images/a9071831-3595-4d2d-a0bd-23832f64777f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 262' },
  { id: 263, src: '/api/public/media/images/faa36b93-7099-4c31-a22d-d85d84acb4b3/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 263' },
  { id: 264, src: '/api/public/media/images/5c443901-ea6f-4f66-bc3a-a6bade90aa15/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 264' },
  { id: 265, src: '/api/public/media/images/92929676-cd36-4900-ae4b-d105074fb85f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 265' },
  { id: 266, src: '/api/public/media/images/3764889f-a249-4e44-b98a-0f1e43e282c3/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 266' },
  { id: 267, src: '/api/public/media/images/b73ae2e8-114a-4a68-a3fe-c764c1d0fab0/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 267' },
  { id: 268, src: '/api/public/media/images/49d6b47b-fe3a-4e67-887a-bcb011bb5995/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 268' },
  { id: 269, src: '/api/public/media/images/0ff56fbe-6a4c-49fe-b848-4bf4f55e8983/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 269' },
  { id: 270, src: '/api/public/media/images/2447b9cb-30d7-42bb-82f3-39ade7f3d398/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 270' },
  { id: 271, src: '/api/public/media/images/8b76cd02-d8fb-434e-b8b5-70132ef4dd31/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 271' },
  { id: 272, src: '/api/public/media/images/92cd0869-90fd-480c-b113-2a1afbb2648f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 272' },
  { id: 273, src: '/api/public/media/images/83093a21-5d3a-4147-82fe-0655d2fedd98/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 273' },
  { id: 274, src: '/api/public/media/images/a2bedfd9-29c1-4de0-88d2-48bc84586bc4/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 274' },
  { id: 275, src: '/api/public/media/images/ae51e772-76b7-4d21-ae09-ab3408779199/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 275' },
  { id: 276, src: '/api/public/media/images/29ea120e-e246-4b8e-a14f-cf445b1659d5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 276' },
  { id: 277, src: '/api/public/media/images/67e7b275-8565-4afe-8584-7518fcf52b55/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 277' },
  { id: 278, src: '/api/public/media/images/5cf181c0-b217-4abc-befa-44c8530ea66e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 278' },
  { id: 279, src: '/api/public/media/images/15cb0f13-4c46-4e9e-8c07-d286e478d646/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 279' },
  { id: 280, src: '/api/public/media/images/d9bf5e1e-9309-483b-b5e5-39962873d399/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 280' },
  { id: 281, src: '/api/public/media/images/18d699d1-3489-4baa-b9cd-edd86cff2ab5/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 281' },
  { id: 282, src: '/api/public/media/images/c3709e33-ffe5-43cf-b949-fef2649ac13f/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 282' },
  { id: 283, src: '/api/public/media/images/bdf4c8db-47f8-4ffa-bfc3-58178e18a31b/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 283' },
  { id: 284, src: '/api/public/media/images/dd85c936-fd14-49bb-872c-4a1306e3f3d7/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 284' },
  { id: 285, src: '/api/public/media/images/c58f2e94-a8cd-4369-8ab8-641763fa5003/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 285' },
  { id: 286, src: '/api/public/media/images/81fd9937-bd22-47e0-a5e4-3c1c6d3fad6e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 286' },
  { id: 287, src: '/api/public/media/images/29bd6ce9-2e5a-408c-8aa8-d1718c97b89e/file', alt: 'Modern perde modelleri Ankara', title: 'Modern Perde 287' }
]

const productAdvantages = [
  'Çağdaş tasarım ve nötr renk seçenekleri ile modern mekanlara uyum',
  'Temiz çizgiler ve doğal malzemeler ile minimalist estetik',
  'Stor perde, zebra perde, tül-fon kombinleri ile geniş model yelpazesi',
  'Salon, mutfak, yatak odası için özel tasarım seçenekleri',
  'Uzun ömürlü kullanım için kaliteli kumaş ve işçilik'
]

const usageAreas = [
  'Modern salon ve oturma odaları',
  'Mutfak ve yemek alanları',
  'Yatak odaları',
  'Çalışma odaları ve home office',
  'Otel ve butik otel projeleri',
  'Ofis ve kurumsal mekanlar',
  'Minimalist tasarım konseptli projeler',
  'Çağdaş mimari uygulamalar'
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
      <main className="bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Link href="/perde-modelleri" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Perde Modelleri
              </Link>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm text-gray-400">Modern Perde</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">Model Perde Koleksiyonu</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Modern
              <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                Perde Modelleri
              </span>
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              Modern perde; çağdaş tasarım ve genellikle nötr renkleri içeren modern bir tarzdır. Temiz çizgiler 
              ve doğal malzemeler tercih edilen modern perdeler, sadeliği ve klasik zarafeti ile popülerdir.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">

            <div
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10">
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
                  Modern perdeler ile kombin edilebilen stor perde modelleri, özellikle modern mutfak tasarımları içerisinde 
                  kendine geniş bir şekilde yer buluyor. Stor perdelerin otomatik özellikleri olanların dışında tamamen manuel 
                  özellikleri olanlar, elle katlananlar da vardır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Modern mutfak perdeleri genel olarak eskiden olduğu gibi renkli ve canlı desenli değil daha sadedir. 
                  Sade bir perde kullanımı mutfağınızın tasarımı nasıl olursa olsun o perdeyi rahatlıkla kullanmanıza imkan sağlar.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Salonda tercih edeceğiniz modern perde modelleri için, odanızın büyüklüğü ve duvar dekorasyonunuza göre 
                  karar vermelisiniz. Yoğun desenli perdeler küçük salon dekorasyonu için pek uygun seçimler olmayabilir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Küçük salonlar için ince kumaşlı, &ldquo;uçuş uçuş&rdquo; diye tabir edilen kumaştaki perdeler daha uygun olabilir. 
                  Modern perdeleri; zebra – stor – tül – fon gibi perde modelleri ile tercih edebilirsiniz.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Modern', 'Stor', 'Zebra', 'Minimalist', 'Nötr Renkler', 'Temiz Çizgiler', 'Sade', 'Çağdaş'].map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 backdrop-blur-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/20">
              <h3 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Fiyat Bilgisi
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Modern perde modelleri fiyatları, kumaş cinsine, model karmaşıklığına ve metreye göre değişiklik göstermektedir.
                Modern Perde kolleksiyonumuzu incelemek ve dokunarak hissetmek için sizleri Showroom&apos;umuza bekliyoruz.
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
              Modern Perde Modelleri
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group">
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

            <div
              className="p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/20">
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

            <div
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/20">
              <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Kullanım Alanları
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Modern perde modelleri, çağdaş tasarım konseptli mekanlarınızda minimalist estetik ve 
                fonksiyonelliği bir arada sunar.
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
          <div
          >
            <h3 className="text-2xl md:text-3xl font-extralight text-white mb-4">
              Modern Perde Modelleri Hakkında Sorularınız mı var?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Dilerseniz hemen <strong>0312 241 72 72</strong> no&apos;lu telefondan bize ulaşarak ihtiyacınıza
              uygun modern perde modelleri hakkında bilgi alabilir ve sipariş verebilirsiniz.
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
