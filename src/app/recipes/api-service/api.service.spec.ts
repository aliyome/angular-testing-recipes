import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { waitFor } from '@testing-library/angular';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  test('service is created', () => {
    expect(service).toBeTruthy();
  });

  test('getRecipes() makes GET request to "/api/recipes"', () => {
    service.getRecipes();

    const req = httpController.expectOne('/api/recipes');
    expect(req.request.method).toBe('GET');
  });

  test('getRecipes() retrieves recipes from response json', async () => {
    const data = [
      { id: 1, name: 'recipe1' },
      { id: 2, name: 'recipe2' },
    ];
    const callback = jest.fn();

    service.getRecipes().then(callback);

    const req = httpController.expectOne('/api/recipes');
    req.flush({ data });

    await waitFor(() => expect(callback).toHaveBeenCalledWith(data));
  });
});
