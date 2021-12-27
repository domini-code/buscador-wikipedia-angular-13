import { render, screen } from '@testing-library/angular';
import { Article } from '../search/services/search.service';
import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  it('Should render article ', async () => {
    const articleMock = {
      title: 'Test title',
      timestamp: new Date(),
      snippet: 'Test snippet',
      pageid: 1,
    } as Article;

    await render(ArticleComponent, {
      componentProperties: {
        article: articleMock,
      },
    });

    await screen.getByText(articleMock.title);
  });

  it('Should container a link to wikipedia with pageid', async () => {
    const linkWikipedia = 'https://es.wikepedia.org/?curid=';
    const articleMock = {
      title: 'Test title',
      timestamp: new Date(),
      snippet: 'Test snippet',
      pageid: 1,
    } as Article;

    await render(ArticleComponent, {
      componentProperties: {
        article: articleMock,
      },
    });

    const linkToDetail = await screen.findByText(articleMock.title);
    expect(linkToDetail.getAttribute('href')).toEqual(
      `${linkWikipedia}${articleMock.pageid}`
    );
  });
});