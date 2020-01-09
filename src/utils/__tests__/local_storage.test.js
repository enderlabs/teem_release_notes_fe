import {
  updateTeemData, getTeemData, clearData,
} from '../local_storage';
import LocalStorageMock from '../../../test/utils/common_mocks';

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

describe('localStorage util', () => {
  it('clears teem data, verify does not exist', () => {
    localStorage.setItem('teem', 'a value');
    expect(localStorage.getItem('teem')).toBeDefined();
    expect(clearData()).toBeTruthy();
    expect(localStorage.getItem('teem')).toBeFalsy();
  });

  it('gets data out of local storage', () => {
    localStorage.setItem('teem', JSON.stringify({ test: 'asdf' }));
    const data = getTeemData('test');
    expect(data).toBe('asdf');
  });

  it('returns null if no data', () => {
    const spy = jest.spyOn(localStorage, 'getItem');
    const data = getTeemData('salad');
    expect(spy).toHaveBeenCalledWith('teem');
    expect(data).toBe(null);
  });

  it('deletes teem local storage data', () => {
    updateTeemData('test', 'taco');
    expect(localStorage.getItem('teem')).toContain('taco');
    updateTeemData('test', '');
    expect(localStorage.getItem('teem')).not.toContain('taco');
  });

  test('set then change value in storage', () => {
    localStorage.setItem('teem', JSON.stringify({ test: 'asdf' }));
    expect(localStorage.getItem('teem')).toContain('asdf');
    updateTeemData('test', 'hello');
    expect(localStorage.getItem('teem')).not.toContain('asdf');
    expect(localStorage.getItem('teem')).toContain('hello');
  });

  test('return true if storage is cleared', () => {
    localStorage.setItem('teem', JSON.stringify({ test: 'asdf' }));
    expect(clearData()).toBeTruthy();
  });

  it('updates data in storage', () => {
    updateTeemData('accessToken', 'asdf');
    updateTeemData('refreshToken', 'jkl');
    updateTeemData('accessTokenCreated', 'June 10th 1978');

    expect(localStorage.getItem('teem')).toContain('accessToken');
    expect(localStorage.getItem('teem')).toContain('asdf');
    expect(localStorage.getItem('teem')).toContain('refreshToken');
    expect(localStorage.getItem('teem')).toContain('jkl');
    expect(localStorage.getItem('teem')).toContain('accessTokenCreated');
    expect(localStorage.getItem('teem')).toContain('June 10th 1978');
  });

  test('return null if there is no teem data', () => {
    expect(clearData()).toBeTruthy();
    expect(getTeemData('accessToken')).toBeNull();
  });
});
