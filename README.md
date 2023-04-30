# similarweb-data-scraper
A Node.js tool for scraping website traffic and engagement data from SimilarWeb, such as monthly visits and average visit duration.

The input is provided as a text file containing a list of websites, and the output is saved as a JSON or CSV file with the scraped data.

Features
Scrape monthly visits and average visit duration for a list of websites
Read website list from a text file
Export the scraped data as JSON or CSV
Requirements
Node.js
Puppeteer
Installation
Clone the repository to your local machine:
git clone https://github.com/yourusername/similarweb-data-scraper.git

Change to the repository directory:
cd similarweb-data-scraper

Install dependencies:
npm install

Usage
Create a text file named websites.txt in the project directory and list the websites you want to scrape data for, with one website per line:
example.com
anotherexample.com

Open the index.js file and make sure it includes the required modules and functions:
const csvParser = require('csv-parser');
const fs = require('fs');
const normalizeUrl = require('./normalizeUrl');
const scrapeSimilarWebData = require('./scrapeSimilarWebData');
const writeScrapedDataToFile = require('./writeScrapedDataToFile');

Run the script:
node index.js

The script will read the websites from the websites.txt file, scrape their data from SimilarWeb, and save the results to a JSON or CSV file.
