import { async, inject, TestBed } from '@angular/core/testing';

import { SiteService } from './site.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteService],
      imports: [],
    });
  });

  it('should be defined', async(
    inject([SiteService], service => {
      expect(service).toBeDefined();
    })
  ));

  describe('getDataOfPage method', () => {
    it('should create new request', async(
      inject([SiteService], (siteService: SiteService) => {
        const list = [
          {
            name: 'Contact',
            url: '/contact/',
            endpoint: '/contacts',
            __str__: 'Contact',
            children: [],
          },
        ];
        const response = {
          endpoint: list[0].endpoint,
          pathData: {
            type: 'list',
            path: list[0].url,
          },
        };
        spyOn(siteService, 'generateData').and.returnValue(response);
        const result = siteService.getDataOfPage(list[0].endpoint, list);
        result.subscribe(dataList => {
          expect(dataList).toEqual(response);
        });
      })
    ));
  });

  describe('generateData method', () => {
    it('should generate data of page', async(
      inject([SiteService], (siteService: SiteService) => {
        const list = [
          {
            name: 'Contact',
            url: '/contact/',
            endpoint: '/contacts',
            __str__: 'Contact',
            children: [],
          },
        ];
        const url = ['contact'];
        const pathData = {
          type: 'list',
          path: list[0].url,
        };
        spyOn(siteService, 'getTypeOfPage').and.returnValue(pathData);
        spyOn(siteService, 'getElementFromList').and.returnValue(list[0]);
        const result = siteService.generateData(list, url);
        expect(siteService.getTypeOfPage).toHaveBeenCalledWith(url);
        expect(siteService.getElementFromList).toHaveBeenCalledWith(
          list,
          list[0].url
        );
        expect(result).toEqual({
          endpoint: list[0].endpoint,
          pathData,
        });
      })
    ));
  });

  describe('generatePath method', () => {
    it('should generate path of url', async(
      inject([SiteService], (siteService: SiteService) => {
        const url = ['contact'];
        const result = siteService.generatePath(url);
        expect(result).toEqual('/contact/');
      })
    ));
  });

  describe('getTypeOfPage method', () => {
    it('should return form type of page', async(
      inject([SiteService], (siteService: SiteService) => {
        const url = [
          {
            path: 'contact',
          },
          {
            path: 'add',
          },
        ];
        spyOn(siteService, 'generatePath').and.returnValue('/contact/');
        const result = siteService.getTypeOfPage(url);
        expect(result).toEqual({
          type: 'form',
          path: '/contact/',
        });
      })
    ));

    it('should return form type of page for edit', async(
      inject([SiteService], (siteService: SiteService) => {
        const url = [
          {
            path: 'contact',
          },
          {
            path: '123',
          },
          {
            path: 'change',
          },
        ];
        spyOn(siteService, 'generatePath').and.returnValue('/contact/');
        const result = siteService.getTypeOfPage(url);
        expect(result).toEqual({
          type: 'form',
          path: '/contact/',
          id: '123',
        });
      })
    ));

    it('should return profile type of page', async(
      inject([SiteService], (siteService: SiteService) => {
        const url = [
          {
            path: 'profile',
          },
        ];
        spyOn(siteService, 'generatePath').and.returnValue('/profile/');
        const result = siteService.getTypeOfPage(url);
        expect(result).toEqual({
          type: 'form',
          path: '/profile/',
          metadataQuery: 'type=profile',
        });
      })
    ));

    it('should return list type of page', async(
      inject([SiteService], (siteService: SiteService) => {
        const url = [
          {
            path: 'contact',
          },
        ];
        spyOn(siteService, 'generatePath').and.returnValue('/contact/');
        const result = siteService.getTypeOfPage(url);
        expect(result).toEqual({
          type: 'list',
          path: '/contact/',
        });
      })
    ));
  });

  describe('getElementFromList method', () => {
    it('should return some element from list of pages', async(
      inject([SiteService], (siteService: SiteService) => {
        const list = [
          {
            name: 'Contact',
            url: '/contact/',
            endpoint: '/contacts',
            __str__: 'Contact',
            children: [
              {
                name: 'Candidate Contact',
                url: '/contact/candidate/',
                endpoint: '/candidatecontact',
                __str__: 'Candidate Contact',
                children: [],
              },
            ],
          },
        ];
        const path = list[0].children[0].url;
        const result = siteService.getElementFromList(list, path);
        expect(result).toEqual(list[0].children[0]);
      })
    ));
  });
});
