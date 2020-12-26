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

module.exports = {
  populate: async (params) => {
    const gogApiUrl = `${BASE_URL}games/ajax/filtered?mediaType=game&page=1&sort=popularity`
    const { data: { products }} = await axios.get(gogApiUrl)
    console.log(products[0]);

    const {publisher, developer} = products[0]

    await strapi.services.publiser.create(
      {
        name: publisher,
        slug: slugify(publisher).toLowerCase()
      }
    )

    await strapi.services.developer.create(
      {
        name: developer,
        slug: slugify(developer).toLowerCase()
      }
    )
  }
};
