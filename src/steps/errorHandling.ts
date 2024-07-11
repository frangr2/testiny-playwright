export function handleErrors(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
  
    descriptor.value = async function(...args: any[]) {
      try {
        await originalMethod.apply(this, args);
      } catch (error) {
        console.error(`Error in step '${propertyKey}':`, error);
        throw error;  // Propaga el error para que la prueba falle
      }
    };
  
    return descriptor;
  }
  