from urllib.request import urlopen,Request, HTTPError
from bs4 import BeautifulSoup

# Below is the fucntion that scrapes the 5 pages of the link given.
def getCrawledData():
    listOfRepo = []
    #  loop through the 5 pages of the repo search result.
    for i in range(1,6):
      url = "https://github.com/search?o=desc&q=nodejs&s=updated&type=Repositories&p=" + str(i)
      page = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
      page = urlopen(page).read().decode('utf-8')
      soup = BeautifulSoup(page)
      ul = soup.find('ul', {'class': 'repo-list'}) # catch the ul tag inside which all the repo is listed.

      children = ul.findChildren('li', {'class': 'repo-list-item'}) # find the children
      for child in children:
        title = child.find('a', {'class': 'v-align-middle'}).text if child.find('a', {'class': 'v-align-middle'}) else ''
        desc = child.find('p').text if child.find('p') else ''
        tag = child.find('a', {'class': 'topic-tag'}).text if child.find('a', {'class': 'topic-tag'}) else ''
        language = child.find('span', {'itemprop': "programmingLanguage"}).text if child.find('span', {'itemprop': "programmingLanguage"}) else ''
        listOfRepo.append(
            {
                'title':title,
                'desc': desc.replace('\n', '').strip(),
                'tag': [tag for tag in tag.replace('\n', ' ').split(' ') if len(tag) > 0],
                'language': language.replace('\n', ''),
            }
        )

    # listOfRepo has the list of scrapped data as objects.
    return listOfRepo

getCrawledData()
