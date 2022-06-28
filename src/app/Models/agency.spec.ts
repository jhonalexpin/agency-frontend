import { Agency } from './agency';

describe('Agency', () => {
  it('should create an instance', () => {
    expect(new Agency('123', 'Name1', '', '', '', '', '', ''))
      .toBeTruthy();
  });
});
