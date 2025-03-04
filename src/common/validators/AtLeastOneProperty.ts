import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function AtLeastOneProperty(properties: string[], validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'AtLeastOneProperty',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          return properties.some(prop => object[prop] > 0);
        },
        defaultMessage(args: ValidationArguments) {
          return `Pelo menos uma das propriedades ${properties.join(', ')} deve ser maior que 0.`;
        }
      }
    });
  };
}
