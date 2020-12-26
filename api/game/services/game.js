'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
const axios = require('axios')
const slugify = require('slugify')

const BASE_URL = 'https://www.gog.com/'

async function getGameInfo(slug) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const body = await axios.get(`${BASE_URL}game/${slug}`)
  const dom = new JSDOM(body.data)

  const description = dom.window.document.querySelector('.description')

  return {
    rating: 'BR0',
    short_description: description.textContent.slice(0, 160),
    description: description.innerHTML
  }
}

async function getByName(name, entityName) {
  const item = await strapi.services[entityName].find({ name })
  return item.length ? item[0] : null;
}

async function create(name, entityName) {
  const item = await getByName(name, entityName)
  if (!item) {
    return await strapi.services[entityName].create(
      {
        name,
        slug: slugify(name, { lower: true })
      }
    )
  }

  console.info(`Na entidade: ${entityName} já existe o(a): ${name} `);
}

module.exports = {
  populate: async (params) => {
    const gogApiUrl = `${BASE_URL}games/ajax/filtered?mediaType=game&page=1&sort=popularity`
    const { data: { products }} = await axios.get(gogApiUrl)
    // console.log(products[0]);

    const {publisher, developer} = products[1]

    await create(publisher, 'publiser')
    await create(developer, 'developer')
  }
};
