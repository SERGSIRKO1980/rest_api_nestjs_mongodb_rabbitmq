import { IsEmail, isNumber, isString, isURL, validate } from 'class-validator';
import { UserDto } from './create-user.dto';
import { plainToInstance } from 'class-transformer';
import isImageURL from 'image-url-validator';

describe(UserDto, () => {
  let dto: UserDto;
  beforeAll(() => {
    dto = {
      id: null,
      email: null,
      first_name: '',
      last_name: '',
      avatar: '',
    };
  });
  it('id is empty', async () => {
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('id')).toBeTruthy();
  });

  it('id is not empty and is not a string, id is a number', async () => {
    dto.id = 1;
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('id')).toBeFalsy();
    expect(isString(dto.id) && !isNumber(dto.id)).toBeFalsy();
  });

  it('email is empty', async () => {
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('email')).toBeFalsy();
    expect(!IsEmail(dto.email)).toBeFalsy();
  });

  it('email is not empty and is a string but is not a mailing address', async () => {
    dto.email = 'george.bluthreqres.in';
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('email')).toBeTruthy();
    expect(IsEmail(dto.email) && !isString(dto.email)).toBeFalsy();
  });

  it('email is a mailing address', async () => {
    dto.email = 'george.bluth@reqres.in';
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('email')).toBeFalsy();
    expect(!IsEmail(dto.email)).toBeFalsy();
  });

  it('first_name is empty', async () => {
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(
      errors.map((err) => err.property).includes('first_name'),
    ).toBeFalsy();
  });

  it('first_name is not empty and is a string', async () => {
    dto.first_name = 'Janet';
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(
      errors.map((err) => err.property).includes('first_name'),
    ).toBeFalsy();
    expect(!isString(dto.first_name)).toBeFalsy();
  });

  it('last_name is empty', async () => {
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('last_name')).toBeFalsy();
  });

  it('last_name is not empty and is a string', async () => {
    dto.last_name = 'Weaver';
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('last_name')).toBeFalsy();
    expect(!isString(dto.last_name)).toBeFalsy();
  });

  it('avatar is empty', async () => {
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('avatar')).toBeTruthy();
  });

  it('avatar is not empty and is a string, url but is not an image url', async () => {
    dto.avatar = 'https://reqres.in/img/faces/1-image.';
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('avatar')).toBeFalsy();
    expect(!isString(dto.avatar)).toBeFalsy();
    expect(!isURL(dto.avatar) && isImageURL(dto.avatar)).toBeFalsy();
  });

  it('avatar is an image url', async () => {
    dto.avatar = 'https://reqres.in/img/faces/1-image.jpg';
    const ofImportDto = plainToInstance(UserDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('avatar')).toBeFalsy();
    expect(!isString(dto.avatar)).toBeFalsy();
    expect(!isURL(dto.avatar) && !isImageURL(dto.avatar)).toBeFalsy();
  });
});
