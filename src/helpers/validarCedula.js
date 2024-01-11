//Validar cedula
const validarCedula = (cedula) => {
    // Verificar la longitud de la cédula
    if (cedula.length !== 10) {
      return false;
    }
  
    // Obtener los primeros 9 dígitos de la cédula
    const digitos = cedula.substring(0, 9);
  
    // Calcular el dígito verificador esperado
    let suma = 0;
    for (let i = 0; i < digitos.length; i++) {
      let digito = parseInt(digitos[i], 10);
  
      if (i % 2 === 0) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
  
      suma += digito;
    }
  
    const digitoVerificadorEsperado = (10 - (suma % 10)) % 10;
  
    // Obtener el último dígito de la cédula
    const digitoVerificador = parseInt(cedula[9], 10);
  
    // Comparar el dígito verificador calculado con el dígito verificador proporcionado
    return digitoVerificador === digitoVerificadorEsperado;
  };

  export default validarCedula;