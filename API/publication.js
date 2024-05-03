import puppeteer from 'puppeteer'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function setDropdown(page, dropdownId, value) {
	await page.waitForSelector(`a[data-activates="${dropdownId}"]`)
	await page.click(`a[data-activates="${dropdownId}"]`)
	await page.waitForSelector(`#${dropdownId}`)
	await page.waitForSelector(`li[data-content="${value}"]`)
	await page.click(`li[data-content="${value}"]`)
}

async function fillFormFirstSegment(page, price) {
	await timeout(1000)
	await setDropdown(page, 'dropdown_brands', 'acura')
	await timeout(1000)
	await setDropdown(page, 'dropdown_models', 'ilx')
	await timeout(1000)
	await setDropdown(page, 'dropdown_subtypes', 'sedan')
	await setDropdown(page, 'dropdown_years', '2018')
	await setDropdown(page, 'dropdown_provinces', 'nuevo leon')
	await timeout(1000)
	await setDropdown(page, 'dropdown_cities', 'monterrey')
	await page.waitForSelector('#input_recorrido')
	await page.type('#input_recorrido', '20000')
	await page.type('#input_precio', `${price}`)
	console.log('Uploaded first segment of form.')
}
async function fillFormSecondSegment(page, description) {
	await page.waitForSelector('#input_text_area_review')
	await page.type('#input_text_area_review', description)
	await timeout(3000)
	const [fileChooser] = await Promise.all([
		page.waitForFileChooser(),
		page.click('#Uploader'),
	]);
	await fileChooser.accept(['assets/acura_sedan_back.png','assets/acura_sedan_front.png','assets/acura_sedan_side.png'])
	await timeout(3000)
	console.log('Uploaded second segment of form.')
}

export async function makePublication(price, description) {
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()
	await page.setViewport({width: 1080, height: 1024})

	await page.goto('https://www.seminuevos.com/')
	await page.waitForSelector('a[class="login-btn"]')
	console.log('Initialized browser with site.')
	
	await page.click('a[class="login-btn"]');
	await page.waitForSelector('button[type="submit"]')
	
	await page.waitForSelector('#email')
	await page.type('#email', 'edmh94@gmail.com')
	await page.waitForSelector('#password')
	await page.type('#password', 'p5@mfiL2DLJBRzn')
	await page.keyboard.press('Enter')
	await page.waitForNavigation()
	await page.waitForSelector('#logo-opensearch')
	console.log('Logged in site with personal account.')
	
	
	await timeout(1000)
	await page.waitForSelector('a[href="/wizard?f_dealer_id=-1"]')
	await page.click('a[href="/wizard?f_dealer_id=-1"]')
	await page.waitForSelector('div[class="icon-type"]')
	
	await fillFormFirstSegment(page, price)
	await page.click('button[class="next-button"]')
	await fillFormSecondSegment(page, description)
	await page.waitForSelector('button[class="next-button"]')
	await page.click('button[class="next-button"]')
	console.log('Publication has been created.')
	
	
	
	await timeout(10000)
	await page.click(`a[data-tooltip="Publicaciones"]`)
	const posts = await page.$$("div[class='articles antiscroll-inner'] div[class='article'] a[href]")
	await posts[0].evaluate(b => b.click())
	await page.waitForNavigation()
	await page.click(`a[class="openSidebarBtn"]`)
	await timeout(2000)
	console.log('Locking at publication page.')
	await page.screenshot({ path: 'images/publication.png' })

	await browser.close()
}