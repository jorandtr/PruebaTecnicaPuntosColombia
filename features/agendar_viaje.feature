Feature: Agendar un viaje en línea aplicando filtro de precios
  Como Product Owner
  Quiero agendar un viaje en línea aplicando el filtro de precios
  Para entregar independencia a mis clientes
    
  Scenario Outline: Agendar un viaje con parámetros dinámicos
    Given el usuario abre la página principal de viajes
    When ingresa los datos de partida "<partida>" y regreso "<regreso>" la cantidad de adultos "<adultos>" y niños "<ninos>"
    And presiona el botón LOAD MORE
    And filtra el precio mínimo "<precio_min>" y máximo "<precio_max>"
    And selecciona el destino "<destino>"
    And llena los datos personales con:
      | nombre     | <nombre>   |
      | email      | <email>    |
      | id         | <id>      |
      | telefono   | <telefono> |
    And carga el archivo "<archivo>"
    And aplica el código promocional "<codigo>"
    And finaliza el checkout
    Then el sistema deberia mostrar el mensaje "Destination Booked"

  Examples:
  | partida | regreso | adultos | ninos | precio_min | precio_max | destino    | nombre       | email                 | id           |telefono    | archivo                      | codigo |
  | 7       | 13      | 2       | 1     | 100        | 500        | Tongli     | Jorge Torres | jorge@correo.com      | 107-26-6308  |+17871234567| testFiles\Turno20102025.pdf  | 12000  |