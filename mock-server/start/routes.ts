/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/districts', (ctx) => {
  return ctx.response.json([
    { id: 1, label: 'Thiruvananthapuram', parentId: 'Kerala' },
    { id: 2, label: 'Kollam', parentId: 'Kerala' },
    { id: 3, label: 'Pathanamthitta', parentId: 'Kerala' },
    { id: 4, label: 'Alappuzha', parentId: 'Kerala' },
    { id: 5, label: 'Kottayam', parentId: 'Kerala' },
    { id: 6, label: 'Idukki', parentId: 'Kerala' },
    { id: 7, label: 'Eranakulam', parentId: 'Kerala' },
    { id: 8, label: 'Thrissur', parentId: 'Kerala' },
    { id: 9, label: 'Palakkad', parentId: 'Kerala' },
    { id: 10, label: 'Malappuram', parentId: 'Kerala' },
    { id: 11, label: 'Kozhikkod', parentId: 'Kerala' },
    { id: 12, label: 'Wayanad', parentId: 'Kerala' },
    { id: 13, label: 'Kannur', parentId: 'Kerala' },
    { id: 14, label: 'Kasaragod', parentId: 'Kerala' },
  ])
})
Route.get('/local_body_type', (ctx) => {
  return ctx.response.json([
    { id: 1, label: 'Municipal Corporation' },
    { id: 2, label: 'Municipality' },
    { id: 3, label: 'Grama Panchayat' },
  ])
})
Route.get('/local_body_name/:districtId/:localBodyType', async (ctx) => {
  const districtId = ctx.request.param('districtId')
  const localBodyType = ctx.request.param('localBodyType')
  console.log(districtId, localBodyType)
  const data = [
    {
      id: 1,
      label: 'Kochi Corporation',
      local_body_type: 1,
      district_id: 7,
    },
    {
      id: 2,
      label: 'Thiruvananthapuram Corporation',
      local_body_type: 1,
      district_id: 1,
    },
    {
      id: 3,
      label: 'Thodupuzha Municipality',
      local_body_type: 2,
      district_id: 6,
    },
  ]
  const result = data.filter(
    (item) =>
      item.district_id == parseInt(districtId) && item.local_body_type == parseInt(localBodyType)
  )
  if (result) {
    ctx.response.json(result)
  } else {
    ctx.response.notFound('No data found')
  }
})
Route.get('/zones/:localBodyId', async (ctx) => {
  const localBodyId = ctx.request.param('localBodyId')

  const data = [
    { id: 1, label: 'Kochi Main office', local_body_id: 1 },
    { id: 2, label: 'Mattanchery', local_body_id: 1 },
    { id: 3, label: 'Fort Kochi', local_body_id: 1 },
  ]
  const result = data.filter((item) => item.local_body_id == localBodyId)
  if (result) {
    ctx.response.json(result)
  } else {
    ctx.response.notFound('No data found')
  }
})
Route.get('/wards/:zonalId', async (ctx) => {
  const zonalId = ctx.request.param('zonalId')

  const data = [
    { id: 1, label: 'Ward 1', zonal_office_id: 1 },
    { id: 2, label: 'Ward 2', zonal_office_id: 1 },
    { id: 3, label: 'Ward 3', zonal_office_id: 1 },
    { id: 4, label: 'Ward 4', zonal_office_id: 2 },
    { id: 5, label: 'Ward 5', zonal_office_id: 2 },
    { id: 6, label: 'Ward 6', zonal_office_id: 2 },
    { id: 7, label: 'Ward 7', zonal_office_id: 3 },
  ]
  const result = data.filter((item) => item.zonal_office_id == zonalId)
  if (result) {
    ctx.response.json(result)
  } else {
    ctx.response.notFound('No data found')
  }
})
Route.get('/occupancy-nature', async (ctx) => {
  const data = [
    { id: 1, label: 'Residential' },
    { id: 2, label: 'Office' },
    { id: 3, label: 'Commercial' },
    { id: 4, label: 'Schools' },
  ]

  ctx.response.json(data)
})
Route.get('/villages/:localBodyId', async (ctx) => {
  const localBodyId = ctx.request.param('localBodyId')
  const data = [
    { id: 1, label: 'Village 1', local_body_id: 1 },
    { id: 2, label: 'Village 2', local_body_id: 1 },
    { id: 3, label: 'Village 3', local_body_id: 1 },
  ]

  ctx.response.json(data.filter((d) => d.local_body_id == localBodyId))
})

Route.post('/form2/submit', async (ctx) => {
  return ctx.response.json({ message: 'Data submitted successfully' })
})
