import { TestBed } from '@angular/core/testing'; // angular specific method that we use for testing 
import { AppComponent } from './app.component';  //this is  the component that we are going to test
describe('App', () => {   // this is the jasmine describe function, and this is how we begin 
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AppComponent]});
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
