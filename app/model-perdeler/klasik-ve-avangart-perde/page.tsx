'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  buildProductGalleryFallback,
  getPublicProductGalleryContent,
} from '@/lib/productGalleryContent'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-klasik-ve-avangart-perde'

const productImages = [
  { id: 1, src: '/api/public/media/images/df6a191d-3db6-4645-a083-f71422f49200/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 1' },
  { id: 2, src: '/api/public/media/images/5d1dd34a-6209-4e19-b302-8e5873cf5697/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 2' },
  { id: 3, src: '/api/public/media/images/354008d5-9188-4424-9ba1-7397e679b180/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 3' },
  { id: 4, src: '/api/public/media/images/850c4057-7d34-42b8-adf6-33b55e10d9b2/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 4' },
  { id: 5, src: '/api/public/media/images/6bc661e2-6a1e-41bc-937b-3f2b48d9a838/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 5' },
  { id: 6, src: '/api/public/media/images/1251a4ad-ad4a-45a8-a0ad-f93cb10c3370/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 6' },
  { id: 7, src: '/api/public/media/images/cb984eb6-a61b-47b1-a717-c23ad529c971/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 7' },
  { id: 8, src: '/api/public/media/images/8e437d27-40da-45bd-92f0-4b4ff9041739/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 8' },
  { id: 9, src: '/api/public/media/images/93fef5d9-8697-477d-8533-c6f236392f3c/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 9' },
  { id: 10, src: '/api/public/media/images/69175b74-c7e0-405c-9dc7-12a52c97fd3e/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 10' },
  { id: 11, src: '/api/public/media/images/a047452d-a037-41b1-823f-cb6542f6e10f/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 11' },
  { id: 12, src: '/api/public/media/images/e144914a-c05a-4987-b04a-0e905506ae0c/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 12' },
  { id: 13, src: '/api/public/media/images/136893ef-e48e-42f2-9c38-586a1a557000/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 13' },
  { id: 14, src: '/api/public/media/images/8f19ec26-d819-4b4e-a90c-9b974f63702b/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 14' },
  { id: 15, src: '/api/public/media/images/3859e44b-5b04-4f53-9ea6-c67a1ba1df2f/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 15' },
  { id: 16, src: '/api/public/media/images/b28bd0aa-151b-4235-a48f-5b5a0257cfb5/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 16' },
  { id: 17, src: '/api/public/media/images/e43a5821-fbe8-4bcc-bfbe-c8c2dedd3d00/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 17' },
  { id: 18, src: '/api/public/media/images/326bb377-9b9f-4cb8-93d8-eb2329504019/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 18' },
  { id: 19, src: '/api/public/media/images/16256c30-6c6c-41e9-85ec-51b555982891/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 19' },
  { id: 20, src: '/api/public/media/images/92a7ed2a-d417-458e-8f53-3ec868a1549c/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 20' },
  { id: 21, src: '/api/public/media/images/bdfd712e-fa82-46fa-8687-2e4637262151/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 21' },
  { id: 22, src: '/api/public/media/images/7bfec19b-149d-411c-9def-2ab9a7b9391b/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 22' },
  { id: 23, src: '/api/public/media/images/43f97265-b06d-4dd4-9c7b-151403621255/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 23' },
  { id: 24, src: '/api/public/media/images/666f2f02-195b-44d8-a3ef-1d5c6d9bcc08/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 24' },
  { id: 25, src: '/api/public/media/images/a7e69e6b-56f9-4e83-b740-79795ca7f933/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 25' },
  { id: 26, src: '/api/public/media/images/8a831315-0b3c-4692-846c-37d9caa18458/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 26' },
  { id: 27, src: '/api/public/media/images/a1f7f587-dfef-4fb7-8b10-667795f273be/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 27' },
  { id: 28, src: '/api/public/media/images/8359ae84-ec7c-4be7-89e2-00be302d28fa/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 28' },
  { id: 29, src: '/api/public/media/images/de97ec68-35cb-401f-92f8-4c95e6ebfb7d/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 29' },
  { id: 30, src: '/api/public/media/images/cd196aa9-3a36-4803-abe2-e679a968949d/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 30' },
  { id: 31, src: '/api/public/media/images/08cdde3d-7863-45d0-98ce-cf463806d3f5/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 31' },
  { id: 32, src: '/api/public/media/images/964fdec7-e3d5-446d-91f1-211fe2a84820/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 32' },
  { id: 33, src: '/api/public/media/images/83e32c4d-9307-4cf2-88cd-a2ce286e8f1d/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 33' },
  { id: 34, src: '/api/public/media/images/0fe5e267-2129-4c8e-9991-4b00f675237e/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 34' },
  { id: 35, src: '/api/public/media/images/5546a503-3176-4696-ba2d-af4030fd5e46/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 35' },
  { id: 36, src: '/api/public/media/images/24ff88de-fe4b-4156-be3d-cce27dec8ec6/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 36' },
  { id: 37, src: '/api/public/media/images/1ec34eb5-170a-4da0-9d70-6e7666073c16/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 37' },
  { id: 38, src: '/api/public/media/images/89faf08b-80fe-48ee-9272-0e5c11a5587c/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 38' },
  { id: 39, src: '/api/public/media/images/1e09f8ee-25a7-4aa7-b236-397d316159c6/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 39' },
  { id: 40, src: '/api/public/media/images/65c2420a-0091-4336-a8ad-97d70570073f/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 40' },
  { id: 41, src: '/api/public/media/images/5b3aba1d-6d31-4cff-8066-264eac778356/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 41' },
  { id: 42, src: '/api/public/media/images/6b4720a0-2dd2-467a-b07a-22c52b316be9/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 42' },
  { id: 43, src: '/api/public/media/images/7b592397-ca03-4018-bfe0-726f2d781cab/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 43' },
  { id: 44, src: '/api/public/media/images/df34ca95-cc75-441c-bb4c-90da93622666/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 44' },
  { id: 45, src: '/api/public/media/images/f63cba50-a4d5-49bd-9e3f-22643a3d909f/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 45' },
  { id: 46, src: '/api/public/media/images/9aa2dde0-6fbb-4ff1-8c5b-e7a71a700a16/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 46' },
  { id: 47, src: '/api/public/media/images/a5ae5aff-8c8b-413b-9d5e-73cc70cd48a4/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 47' },
  { id: 48, src: '/api/public/media/images/5868c776-d67c-4cff-a479-82eab5765e4d/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 48' },
  { id: 49, src: '/api/public/media/images/4acd0c1e-58e5-4eee-9e2d-1fd9f0f75e11/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 49' },
  { id: 50, src: '/api/public/media/images/b7847c98-ff1a-4eae-ba85-ee906c38784b/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 50' },
  { id: 51, src: '/api/public/media/images/a035b1bd-70fe-4cec-9c67-e06a697e7a73/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 51' },
  { id: 52, src: '/api/public/media/images/4edec21e-8b17-4775-8706-835018385ba6/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 52' },
  { id: 53, src: '/api/public/media/images/f49ba72e-ac95-442a-bc7d-8d3b39b7c01f/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 53' },
  { id: 54, src: '/api/public/media/images/31846735-faca-40e2-9ec9-cf196905ea60/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 54' },
  { id: 55, src: '/api/public/media/images/c3c34be4-78bd-4e89-95d4-758a6c86e72a/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 55' },
  { id: 56, src: '/api/public/media/images/4406f359-47a3-41f4-9533-1c639c330df5/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 56' },
  { id: 57, src: '/api/public/media/images/872d24f8-4461-45dd-900b-175bf5abe562/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 57' },
  { id: 58, src: '/api/public/media/images/201e1f67-8459-4766-83a1-04e7badea4c7/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 58' },
  { id: 59, src: '/api/public/media/images/49202c9b-2cdd-48d0-a604-da0bed160825/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 59' },
  { id: 60, src: '/api/public/media/images/1b5e216e-a1af-4d10-af39-f0d11a46ce04/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 60' },
  { id: 61, src: '/api/public/media/images/ecd12395-a4a0-406d-b290-a78dedab2864/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 61' },
  { id: 62, src: '/api/public/media/images/b9c7583c-92ed-46da-8c26-92811d3ffa81/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 62' },
  { id: 63, src: '/api/public/media/images/c66b3a21-50fb-4786-affd-3e9cb6491fd0/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 63' },
  { id: 64, src: '/api/public/media/images/85cc6057-7e48-43fb-91e1-c7682fd4530b/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 64' },
  { id: 65, src: '/api/public/media/images/2724ed9a-42a2-44f2-8182-76e74c3b63b1/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 65' },
  { id: 66, src: '/api/public/media/images/08474932-e818-41aa-b6d1-1e3c7f11f036/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 66' },
  { id: 67, src: '/api/public/media/images/e8601fb9-1101-459f-ab89-cb67d7cb3612/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 67' },
  { id: 68, src: '/api/public/media/images/7dac56e2-2b29-4c38-bec4-895649391246/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 68' },
  { id: 69, src: '/api/public/media/images/db01da0f-17bd-44aa-99f4-9b39d3ef360b/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 69' },
  { id: 70, src: '/api/public/media/images/23173a80-64dd-4b05-a3dc-2204761e9848/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 70' },
  { id: 71, src: '/api/public/media/images/c632c84c-83a9-494e-8196-a093f3954f4a/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 71' },
  { id: 72, src: '/api/public/media/images/cdc42ef0-2328-43d1-8f2d-cd6249e1c2b6/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 72' },
  { id: 73, src: '/api/public/media/images/ff494c29-86b4-4123-a2a3-6649395ba2cd/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 73' },
  { id: 74, src: '/api/public/media/images/7bdf770a-b896-4508-a5be-a9077325c1cf/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 74' },
  { id: 75, src: '/api/public/media/images/38581426-6c55-4a76-bff5-e2f4390ec818/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 75' },
  { id: 76, src: '/api/public/media/images/1ad36106-f0a3-4032-8eb3-a5bbf977d090/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 76' },
  { id: 77, src: '/api/public/media/images/e0c94718-c4fa-4e35-98fa-2acaeb960ac2/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 77' },
  { id: 78, src: '/api/public/media/images/7c799497-744c-44d0-aa45-192741607881/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 78' },
  { id: 79, src: '/api/public/media/images/41d561a8-dab3-43f9-a73a-d4b912881887/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 79' },
  { id: 80, src: '/api/public/media/images/4ca50087-628f-48b5-bc06-b4b9b5008d76/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 80' },
  { id: 81, src: '/api/public/media/images/8a6565fd-b322-43af-9f29-cf1cfdbbf999/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 81' },
  { id: 82, src: '/api/public/media/images/5d06f277-1758-4ed2-8968-7bed33e1230a/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 82' },
  { id: 83, src: '/api/public/media/images/b5515227-5cc7-40d7-9760-c2962ae69105/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 83' },
  { id: 84, src: '/api/public/media/images/4df94c04-34d4-46df-abf6-24f48800647e/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 84' },
  { id: 85, src: '/api/public/media/images/327ca438-5bfc-45af-800a-005a39045a83/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 85' },
  { id: 86, src: '/api/public/media/images/d264e5cc-67a4-45cc-b793-178f850bbff5/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 86' },
  { id: 87, src: '/api/public/media/images/34c48b6d-b441-4855-9ef6-196c2337f3a1/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 87' },
  { id: 88, src: '/api/public/media/images/7ad602bc-2edb-40c4-bb05-a53e886095b9/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 88' },
  { id: 89, src: '/api/public/media/images/bbd13249-3c60-4ff1-a6ec-a287ec08c629/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 89' },
  { id: 90, src: '/api/public/media/images/580b17ea-4f4a-450d-9881-c5bec9d680b7/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 90' },
  { id: 91, src: '/api/public/media/images/c163d8b4-2e71-418d-a50c-74279f7cb4e4/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 91' },
  { id: 92, src: '/api/public/media/images/fb3c5ffd-8ff5-477f-b5e8-acfe33d53776/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 92' },
  { id: 93, src: '/api/public/media/images/bad24e27-1d7f-47b9-ace3-14d1ad4d6d14/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 93' },
  { id: 94, src: '/api/public/media/images/eb0475f8-2aad-42e8-8884-d94e8c8f3dd9/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 94' },
  { id: 95, src: '/api/public/media/images/13b6a684-3538-4dcf-8cd1-6010c820b18e/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 95' },
  { id: 96, src: '/api/public/media/images/020600c2-b104-413c-b807-6f2ccee0860a/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 96' },
  { id: 97, src: '/api/public/media/images/4076868f-be56-43ab-991a-61fcee9054fc/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 97' },
  { id: 98, src: '/api/public/media/images/5e487e9e-ab22-4d95-ad96-11b5dbd749fa/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 98' },
  { id: 99, src: '/api/public/media/images/13a82874-2cde-48ed-ab26-4f892cc6dce6/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 99' },
  { id: 100, src: '/api/public/media/images/4f3849c1-913b-4149-a205-a0526b02afc9/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 100' },
  { id: 101, src: '/api/public/media/images/5c29d4bb-5cee-422f-bf30-b93e94031303/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 101' },
  { id: 102, src: '/api/public/media/images/42b73c52-38c9-4468-842f-92aeccf03dde/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 102' },
  { id: 103, src: '/api/public/media/images/fc2b08c4-c0ba-4862-bae6-7cffc4eaa2e6/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 103' },
  { id: 104, src: '/api/public/media/images/316a7775-a56b-4dee-83d9-da6fa47cf747/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 104' },
  { id: 105, src: '/api/public/media/images/0add8513-8f60-469d-b390-0ea42b1706e7/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 105' },
  { id: 106, src: '/api/public/media/images/9b1d870b-3315-4b7c-98cf-1b0d700bf733/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 106' },
  { id: 107, src: '/api/public/media/images/a321563a-e0a3-45d8-9bf3-216da8518022/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 107' },
  { id: 108, src: '/api/public/media/images/5f3e2f0b-9852-440b-9949-ab8639e3372b/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 108' },
  { id: 109, src: '/api/public/media/images/7a371f7d-bd07-47f8-8fc7-b08195823c4f/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 109' },
  { id: 110, src: '/api/public/media/images/9e26c3eb-3745-47c4-9fe3-80aa2ff0bd40/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 110' },
  { id: 111, src: '/api/public/media/images/cf279d81-5fff-471c-a682-0beda9111849/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 111' },
  { id: 112, src: '/api/public/media/images/94084c08-b6f1-45e6-8615-77d35484ddda/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 112' },
  { id: 113, src: '/api/public/media/images/dd43a4a6-f56f-42b3-8dde-483a25505cbb/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 113' },
  { id: 114, src: '/api/public/media/images/d3e42b0b-ae02-4de1-95d8-04d836d6f4b6/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 114' },
  { id: 115, src: '/api/public/media/images/b4cae6b2-0677-4f96-a977-2be9718ae85e/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 115' },
  { id: 116, src: '/api/public/media/images/4ee3ee94-fc20-4cf4-8a5a-4941dd88f6bb/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 116' },
  { id: 117, src: '/api/public/media/images/27f652c6-39f5-41a2-8b9a-586fc54ab78f/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 117' },
  { id: 118, src: '/api/public/media/images/b36cac05-975b-4ad3-a6fe-d001bc49b809/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 118' },
  { id: 119, src: '/api/public/media/images/4ab47522-7668-4e83-9a30-317110e6cfc6/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 119' },
  { id: 120, src: '/api/public/media/images/c59162da-e4b9-4369-8bd0-2adc5784438c/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 120' },
  { id: 121, src: '/api/public/media/images/440b8711-d4b5-4e7f-acf4-2c6ab7803596/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 121' },
  { id: 122, src: '/api/public/media/images/95c45fcd-2ef3-45ca-98fd-63c7cd0de21a/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 122' },
  { id: 123, src: '/api/public/media/images/e211f739-efce-4d65-bcf6-95293c0213db/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 123' },
  { id: 124, src: '/api/public/media/images/6fffc1fb-9004-4958-9312-73ca3e9ce6c7/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 124' },
  { id: 125, src: '/api/public/media/images/a8b11ddb-947a-4277-9af2-bf9e54b8b0fb/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 125' },
  { id: 126, src: '/api/public/media/images/5a11af76-b170-4187-a173-868f8b217d9d/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 126' },
  { id: 127, src: '/api/public/media/images/b5c739bc-cb7a-4fef-aef5-c819bb828a29/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 127' },
  { id: 128, src: '/api/public/media/images/8fd58383-5a3e-4176-93d4-361e68d11336/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 128' },
  { id: 129, src: '/api/public/media/images/6f2fa18e-3201-48f9-b1a8-c766c3831e07/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 129' },
  { id: 130, src: '/api/public/media/images/49a9a167-a5b7-48fe-8203-c96b3f04a398/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 130' },
  { id: 131, src: '/api/public/media/images/e1ad18a6-8037-4ba9-8016-41bb23a2d408/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 131' },
  { id: 132, src: '/api/public/media/images/08834b4a-8b9e-4bec-8647-4fdeb284f28e/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 132' },
  { id: 133, src: '/api/public/media/images/ccc5b248-c685-4404-8395-e0a0fa77997f/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 133' },
  { id: 134, src: '/api/public/media/images/9562962b-7fc6-4f1f-ae14-e5dd958687ff/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 134' },
  { id: 135, src: '/api/public/media/images/9e3dfef9-e184-452f-9f4a-ff67ed7dd996/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 135' },
  { id: 136, src: '/api/public/media/images/e823e00c-7bdf-489c-ba76-2eb16821b00d/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 136' },
  { id: 137, src: '/api/public/media/images/a5682597-108a-4a6b-9a86-5ed5853f157d/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 137' },
  { id: 138, src: '/api/public/media/images/50476a3d-3e9b-4537-b94c-64d254d36719/file', alt: 'Klasik ve avangart perde modelleri Ankara', title: 'Klasik Avangart Perde 138' }
]

const productAdvantages = [
  'Modern ve klasik dekorasyonlara mükemmel uyum sağlar',
  'İpek, kadife, desenli gibi kaliteli kumaş seçenekleri',
  'Bordür, ikili fon, geometrik desen gibi tasarım alternatifleri',
  'Uzun ömürlü kullanım için dayanıklı malzeme ve işçilik',
  'Her mekan için özel tasarım perde modelleri'
]

const fallbackPageContent = buildProductGalleryFallback(
  'Klasik ve Avangart',
  'Dekorasyonu tamamlayan, bir mekanın modern veya klasik olmasında belirleyici unsur, perde seçimidir. Perde, dekorasyonun karakterini değiştirebilecek etkiye sahiptir. Perdelerin rengi, modeli, detayları mekanın bütünlüğüne ciddi anlamda katkı sağlamaktadır.',
  productImages,
  'Model Perde Koleksiyonu',
  'Klasik ve Avangart Perde Modelleri',
)

fallbackPageContent.highlight = 'Perde Modelleri'

const usageAreas = [
  'Salon ve oturma odaları',
  'Yatak odaları',
  'Yemek odaları',
  'Otel ve butik otel projeleri',
  'Villa ve rezidans uygulamaları',
  'Ofis ve kurumsal mekanlar',
  'Restoran ve kafe dekorasyonları',
  'Özel tasarım ev tekstili projeleri'
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

export default function KlasikAvangartPerdePage() {
  const [pageContent, setPageContent] = useState(fallbackPageContent)
  const [galleryImages, setGalleryImages] = useState(productImages)
  const [selectedImage, setSelectedImage] = useState(productImages[0])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  
  // Lightbox navigation functions
  const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id)

  useEffect(() => {
    let mounted = true

    getPublicProductGalleryContent(PRODUCT_GALLERY_PAGE_KEY, fallbackPageContent).then((content) => {
      if (!mounted) {
        return
      }

      setPageContent(content)
      setGalleryImages(content.images)
      setSelectedImage((current) => content.images.find((image) => image.id === current.id) || content.images[0] || current)
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

  // ESC tuşu ile modal kapatma + arrow keys ile navigasyon
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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Link href="/perde-modelleri" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Perde Modelleri
              </Link>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm text-gray-400">Klasik ve Avangart Perde</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">{pageContent.eyebrow}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6">
              {pageContent.title}
              {pageContent.highlight && (
                <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                  {pageContent.highlight}
                </span>
              )}
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              {pageContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* Compact Product Info Section */}
      <section className="relative py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Product Info Card - Dark Glassmorphism */}
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
                  Modern bir dekorasyona, perdede yapacağınız birkaç klasik dokunuş dekorasyonun kimliğini salt modernden çıkarır 
                  ve sizi dekorasyonda kullanacağınız aksesuarlarda özgürleştirir. Modern dekorasyon için klasik dokunuşları sağlamak 
                  adına; düz bir fona bordür eklemek, fonu yatay veya dikeyde ikili çalışmak, düz yerine modernize edilmiş bir 
                  klasikleşmiş desen kullanmak olabilir.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Modern çizgiden sapmak istenmeyen durumlarda ise fonun düz veya geometrik desende seçilerek, bağlama yapmadan 
                  kullanılması, Japon perde uygulaması düşünülebilir. Tül mutlaka akıcı ve nötr tonlarda olmalıdır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Avangart perdeleri ise klasik mobilyalarınıza uygun renklerde kullanarak daha uyumlu ve ihtişamlı mekanlar 
                  yaratabilirsiniz. Açık renk mobilyalarda genellikle koyu renk perdeler tercih edilmekte, aynı şekilde koyu renk 
                  mobilyalarda ise açık renk tonları kullanılarak, oluşturulan havaya farklı bir atmosfer katmak amaçlanmaktadır.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Çok klasik bir mekâna özellikle halı ya da döşemelik kumaş desenli ise yapılabilecek en iyi klasik perde; 
                  düz kaliteli kumaşlarla, iyi dikiş tekniğinin birleşerek modelin ön planda tutulduğu ve mekâna göre tasarlandığı perdedir.
                </p>
              </div>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Klasik', 'Modern', 'Avangart', 'İpek', 'Kadife', 'Desenli', 'Bordürlü', 'İkili Fon'].map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 backdrop-blur-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing Card - Dark Glassmorphism */}
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
                Klasik ve avangart perde modelleri fiyatları, kumaş cinsine, model karmaşıklığına ve metreye göre değişiklik göstermektedir.
                Pile Perde, uygun fiyat ve kaliteli hizmet anlayışı ile projelerinizi tamamlamanızı sağlar.
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

      {/* Full Product Gallery - Dark Glassmorphism Grid */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">{pageContent.galleryEyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              {pageContent.galleryTitle}
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

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        {/* Title hidden for UI but kept for SEO */}
                      </div>
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

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Features - Dark Glassmorphism Cards */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Advantages Card */}
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

            {/* Usage Areas Card */}
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
                Klasik ve avangart perde modelleri, ev ve işyeri mekanlarınızda dekoratif bir dokunuşla 
                estetik ve fonksiyonelliği bir arada sunar.
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

      {/* Contact CTA */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div
          >
            <h3 className="text-2xl md:text-3xl font-extralight text-white mb-4">
              Klasik ve Avangart Perde Modelleri Hakkında Sorularınız mı var?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
              Dilerseniz hemen <strong>0312 241 72 72</strong> no&apos;lu telefondan bize ulaşarak ihtiyacınıza
              uygun perde modelleri hakkında bilgi alabilir ve sipariş verebilirsiniz.
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

      {/* Lightbox Modal */}
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
              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
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

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  {/* Title hidden for UI but kept for SEO */}
                  <span className="text-sm text-gray-400">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      </main>
    </>
  )
}
