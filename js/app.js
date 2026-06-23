
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#navLinks");
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("iot-course-theme");
if (savedTheme === "dark") root.classList.add("dark");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("iot-course-theme", root.classList.contains("dark") ? "dark" : "light");
});

const cards = [...document.querySelectorAll(".module-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const searchInput = document.querySelector("#moduleSearch");
let activeFilter = "all";

function updateCards() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  cards.forEach(card => {
    const matchFilter = activeFilter === "all" || card.dataset.week === activeFilter;
    const matchQuery = !query || card.dataset.title.includes(query);
    card.hidden = !(matchFilter && matchQuery);
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateCards();
  });
});

searchInput?.addEventListener("input", updateCards);

const copyButton = document.querySelector("#copyMqtt");
const mqttCode = document.querySelector("#mqttCode");

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(mqttCode.textContent.trim());
    copyButton.textContent = "Copiado";
    setTimeout(() => (copyButton.textContent = "Copiar ejemplo"), 1800);
  } catch {
    copyButton.textContent = "Selecciona y copia";
    setTimeout(() => (copyButton.textContent = "Copiar ejemplo"), 1800);
  }
});

const form = document.querySelector("#contactForm");
const statusEl = document.querySelector("#formStatus");

form?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const nombre = String(data.get("nombre") || "").trim();
  const email = String(data.get("email") || "").trim();
  const perfil = String(data.get("perfil") || "").trim();
  const mensaje = String(data.get("mensaje") || "").trim();

  if (!nombre || nombre.length < 3) return showStatus("Revisa el nombre completo.", true);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showStatus("Revisa el correo electrónico.", true);
  if (!perfil) return showStatus("Selecciona un perfil.", true);
  if (!mensaje || mensaje.length < 10) return showStatus("Escribe un mensaje un poco más detallado.", true);

  const subject = encodeURIComponent("Información Curso Vacacional Redes e IoT");
  const body = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${email}\nPerfil: ${perfil}\n\nMensaje:\n${mensaje}`);
  showStatus("Formulario validado. Se abrirá tu cliente de correo para enviar la solicitud.", false);
  window.location.href = `mailto:correo-institucional@ejemplo.edu?subject=${subject}&body=${body}`;
});

function showStatus(message, isError) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "var(--danger)" : "var(--success)";
}



/* V3: Cuestionarios interactivos del curso */
(() => {
  const quizData = [
  {
    "id": "act1",
    "week": "Semana 1",
    "activity": "Actividad 1",
    "title": "Redes de Datos, IoT e IIoT",
    "questions": [
      {
        "q": "¿Cuál es la función principal de una red de datos en un sistema IoT?",
        "options": [
          "Permitir que dispositivos intercambien información mediante medios y protocolos comunes.",
          "Aumentar exclusivamente la velocidad del procesador del microcontrolador.",
          "Reemplazar los sensores por software de visualización."
        ],
        "answer": 0,
        "feedback": "La red conecta dispositivos y permite que los datos viajen desde sensores o nodos hacia servicios y aplicaciones."
      },
      {
        "q": "En una arquitectura IoT básica, ¿qué elemento convierte una variable física en una señal medible?",
        "options": [
          "Gateway",
          "Sensor",
          "Dashboard"
        ],
        "answer": 1,
        "feedback": "El sensor convierte temperatura, humedad, energía, presión u otra variable física en una señal que puede leer el nodo."
      },
      {
        "q": "¿Qué diferencia suele distinguir a IIoT frente a IoT de consumo?",
        "options": [
          "IIoT exige mayor disponibilidad, robustez y trazabilidad por su contexto industrial.",
          "IIoT no usa sensores ni redes.",
          "IIoT solo funciona sin conexión a Internet."
        ],
        "answer": 0,
        "feedback": "En entornos industriales, una falla puede afectar procesos, producción o seguridad operativa."
      },
      {
        "q": "¿Cuál de las siguientes secuencias representa mejor el flujo de un sistema IoT?",
        "options": [
          "Dashboard → Sensor → Variable → Cableado → Usuario.",
          "Fenómeno físico → Sensor → Nodo → Red → Aplicación.",
          "Aplicación → Usuario → Sensor → Electricidad → Papel."
        ],
        "answer": 1,
        "feedback": "El curso trabaja el flujo desde la variable física hasta la aplicación que permite interpretar o decidir."
      },
      {
        "q": "¿Qué evidencia corta se propone para iniciar el proyecto integrador?",
        "options": [
          "Un mapa conceptual o diagrama básico de arquitectura IoT.",
          "Un informe final completo con pruebas de campo.",
          "Una compra obligatoria de sensores industriales."
        ],
        "answer": 0,
        "feedback": "La primera actividad orienta la selección del problema, variable, sensor, nodo y usuario final."
      }
    ]
  },
  {
    "id": "act2",
    "week": "Semana 1",
    "activity": "Actividad 2",
    "title": "Modelo TCP/IP y Direccionamiento IP",
    "questions": [
      {
        "q": "¿Para qué sirve el modelo TCP/IP en redes de datos?",
        "options": [
          "Organiza la comunicación por funciones o capas para facilitar el intercambio de datos.",
          "Define únicamente el color de los cables Ethernet.",
          "Evita que los dispositivos necesiten direcciones."
        ],
        "answer": 0,
        "feedback": "TCP/IP ayuda a separar funciones: aplicación, transporte, Internet y acceso a red."
      },
      {
        "q": "¿Qué identifica la dirección IP dentro de una red?",
        "options": [
          "El dispositivo o interfaz dentro de una red.",
          "La marca del sensor conectado.",
          "El tipo de tablero usado en el dashboard."
        ],
        "answer": 0,
        "feedback": "La dirección IP permite ubicar el origen o destino de los paquetes en la red."
      },
      {
        "q": "¿Cuál es la función del gateway?",
        "options": [
          "Permitir la comunicación con otras redes fuera de la red local.",
          "Medir temperatura dentro del laboratorio.",
          "Dibujar gráficas en tiempo real."
        ],
        "answer": 0,
        "feedback": "El gateway es la salida de la red local hacia otras redes, por ejemplo Internet."
      },
      {
        "q": "En IoT, ¿por qué son importantes los puertos?",
        "options": [
          "Identifican servicios de aplicación, como HTTP o MQTT.",
          "Sirven para asignar nombres comerciales a los sensores.",
          "Solo se usan cuando no hay WiFi."
        ],
        "answer": 0,
        "feedback": "MQTT usa habitualmente 1883 o 8883; HTTP usa 80 o 443."
      },
      {
        "q": "Si un ESP32 se conecta al WiFi pero no publica datos, ¿qué conviene revisar primero?",
        "options": [
          "IP, gateway, DNS, dirección del broker y puerto MQTT.",
          "El color del cable USB únicamente.",
          "El tamaño del monitor del computador."
        ],
        "answer": 0,
        "feedback": "La conectividad debe verificarse extremo a extremo: nodo, red, gateway, servidor y servicio."
      }
    ]
  },
  {
    "id": "act3",
    "week": "Semana 2",
    "activity": "Actividad 3",
    "title": "Protocolos IoT: HTTP, MQTT y WebSocket",
    "questions": [
      {
        "q": "¿Qué modelo de comunicación caracteriza principalmente a HTTP?",
        "options": [
          "Petición/respuesta.",
          "Publicador/suscriptor.",
          "Difusión analógica sin paquetes."
        ],
        "answer": 0,
        "feedback": "HTTP es útil para APIs, configuración y consultas eventuales."
      },
      {
        "q": "¿Qué protocolo suele ser más eficiente para telemetría periódica de sensores?",
        "options": [
          "MQTT",
          "FTP",
          "SMTP"
        ],
        "answer": 0,
        "feedback": "MQTT es ligero y se basa en broker, tópicos y clientes publicadores/suscriptores."
      },
      {
        "q": "¿Cuándo es conveniente WebSocket?",
        "options": [
          "Cuando se requiere comunicación persistente y actualización en tiempo real en una interfaz web.",
          "Cuando no se permite ninguna conexión activa.",
          "Cuando solo se imprimen resultados en papel."
        ],
        "answer": 0,
        "feedback": "WebSocket mantiene una conexión bidireccional útil para visualización interactiva."
      },
      {
        "q": "¿Qué factor orienta la selección del protocolo en una aplicación IoT?",
        "options": [
          "Frecuencia de datos, latencia, tráfico, seguridad y escalabilidad.",
          "Solo la marca del computador usado por el docente.",
          "El tamaño del aula de clase."
        ],
        "answer": 0,
        "feedback": "No todos los protocolos resuelven el mismo problema; depende del flujo y frecuencia de datos."
      },
      {
        "q": "Para configurar un nodo, recibir mediciones periódicas y actualizar un dashboard en tiempo real, una combinación razonable sería:",
        "options": [
          "HTTP para configurar, MQTT para medir y WebSocket para visualizar.",
          "WebSocket para todo, sin plataforma ni red.",
          "Solo correo electrónico para todos los datos."
        ],
        "answer": 0,
        "feedback": "Esa combinación separa configuración, telemetría y actualización de interfaz."
      }
    ]
  },
  {
    "id": "act4",
    "week": "Semana 2",
    "activity": "Actividad 4",
    "title": "MQTT y Arquitectura Publicador-Suscriptor",
    "questions": [
      {
        "q": "¿Cuál es la función del broker MQTT?",
        "options": [
          "Recibir, enrutar y entregar mensajes a los clientes suscritos.",
          "Medir directamente la humedad del ambiente.",
          "Cambiar la dirección IP de cada sensor automáticamente."
        ],
        "answer": 0,
        "feedback": "El broker desacopla a quienes publican datos de quienes los consumen."
      },
      {
        "q": "En MQTT, ¿qué es un tópico?",
        "options": [
          "Una ruta lógica que organiza los mensajes.",
          "La contraseña del router.",
          "El voltaje de alimentación del sensor."
        ],
        "answer": 0,
        "feedback": "Los tópicos permiten organizar datos por institución, sede, laboratorio, nodo y variable."
      },
      {
        "q": "¿Qué describe mejor el payload?",
        "options": [
          "El contenido del mensaje enviado, por ejemplo JSON con una medición.",
          "El nombre físico del aula.",
          "El tipo de conector USB usado."
        ],
        "answer": 0,
        "feedback": "El payload debe ser claro, consistente y fácil de interpretar por la plataforma."
      },
      {
        "q": "¿Qué implica usar un nivel QoS mayor en MQTT?",
        "options": [
          "Puede mejorar la confiabilidad, pero aumenta el tráfico y la complejidad.",
          "Reduce todos los mensajes a cero.",
          "Elimina la necesidad de broker."
        ],
        "answer": 0,
        "feedback": "QoS ajusta la garantía de entrega, pero no debe usarse sin criterio técnico."
      },
      {
        "q": "¿Para qué sirve Last Will and Testament, LWT?",
        "options": [
          "Para avisar una desconexión inesperada de un cliente.",
          "Para comprimir imágenes de diapositivas.",
          "Para definir colores del dashboard."
        ],
        "answer": 0,
        "feedback": "LWT ayuda a detectar estados anómalos de conexión en sistemas IoT."
      }
    ]
  },
  {
    "id": "act5",
    "week": "Semana 3",
    "activity": "Actividad 5",
    "title": "Plataformas IoT y Flujo de Datos",
    "questions": [
      {
        "q": "¿Qué hace una plataforma IoT?",
        "options": [
          "Integra datos, procesa información, almacena históricos, genera alarmas y facilita visualización.",
          "Solo reemplaza el sensor físico.",
          "Evita que los datos sean validados."
        ],
        "answer": 0,
        "feedback": "La plataforma convierte mensajes dispersos en información organizada y accionable."
      },
      {
        "q": "¿Qué herramienta es especialmente útil para flujos visuales e integración rápida?",
        "options": [
          "Node-RED",
          "Bloc de notas",
          "Calculadora básica"
        ],
        "answer": 0,
        "feedback": "Node-RED permite conectar MQTT, HTTP, bases de datos y reglas con lógica visual."
      },
      {
        "q": "¿Cuándo se vuelve importante una base de datos en un proyecto IoT?",
        "options": [
          "Cuando se necesita histórico, trazabilidad o análisis de series temporales.",
          "Cuando no se quiere guardar nada.",
          "Solo cuando el sensor tiene pantalla."
        ],
        "answer": 0,
        "feedback": "La base de datos permite revisar continuidad, tendencias y evidencia del comportamiento."
      },
      {
        "q": "¿Cuál es una ruta típica del dato en la actividad 5?",
        "options": [
          "Sensor → ESP32 → MQTT → Node-RED → Dashboard.",
          "Dashboard → Papel → Sensor → Usuario.",
          "Servidor → Lápiz → Sensor → Gateway."
        ],
        "answer": 0,
        "feedback": "El flujo ordenado ayuda a probar cada etapa de forma independiente."
      },
      {
        "q": "¿Qué criterio ayuda a seleccionar una plataforma IoT?",
        "options": [
          "Objetivo didáctico, infraestructura disponible, visualización, integración y trazabilidad.",
          "El fondo de pantalla del navegador.",
          "La cantidad de pestañas abiertas."
        ],
        "answer": 0,
        "feedback": "La plataforma debe responder al propósito del prototipo y a los recursos disponibles."
      }
    ]
  },
  {
    "id": "act6",
    "week": "Semana 3",
    "activity": "Actividad 6",
    "title": "Dashboards, Calidad de Datos y Seguridad en IoT",
    "questions": [
      {
        "q": "¿Qué debería mostrar un dashboard IoT mínimo?",
        "options": [
          "Estado actual, tendencia, histórico básico y alertas comprensibles.",
          "Solo un título decorativo.",
          "Únicamente el nombre del estudiante."
        ],
        "answer": 0,
        "feedback": "El dashboard debe ayudar a interpretar datos y tomar decisiones."
      },
      {
        "q": "¿Por qué es crítico el timestamp?",
        "options": [
          "Permite saber si el dato es actual o antiguo.",
          "Cambia automáticamente el sensor instalado.",
          "Evita configurar el broker."
        ],
        "answer": 0,
        "feedback": "Un último valor visible puede estar desactualizado si el nodo dejó de transmitir."
      },
      {
        "q": "¿Cuál es un riesgo frecuente en IoT?",
        "options": [
          "Broker sin autenticación o puertos expuestos.",
          "Demasiados comentarios en el código.",
          "Usar una unidad de medida clara."
        ],
        "answer": 0,
        "feedback": "El acceso no controlado puede comprometer datos, servicios y dispositivos."
      },
      {
        "q": "¿Qué indicador ayuda a detectar fallas de continuidad?",
        "options": [
          "Tiempo desde el último mensaje o latencia.",
          "El número de colores del logotipo.",
          "La resolución del proyector."
        ],
        "answer": 0,
        "feedback": "Continuidad, latencia y huecos de datos son criterios básicos de calidad."
      },
      {
        "q": "¿Cuál es una buena práctica mínima de seguridad?",
        "options": [
          "Usar usuarios y claves robustas, validar datos y controlar exposición de servicios.",
          "Publicar contraseñas en el HTML del sitio.",
          "Desactivar toda autenticación del broker."
        ],
        "answer": 0,
        "feedback": "La seguridad debe aplicarse desde el prototipo, aunque el curso sea académico."
      }
    ]
  },
  {
    "id": "act7",
    "week": "Semana 4",
    "activity": "Actividad 7",
    "title": "Diseño Técnico de una Aplicación IoT",
    "questions": [
      {
        "q": "¿Qué hace que un problema sea adecuado para IoT?",
        "options": [
          "Que sea real, medible y abordable mediante monitoreo, alerta o análisis de datos.",
          "Que no tenga variables medibles.",
          "Que solo dependa de una presentación."
        ],
        "answer": 0,
        "feedback": "El diseño inicia con un problema que pueda traducirse en variables y evidencias."
      },
      {
        "q": "¿Por qué se deben definir unidad, rango y frecuencia de muestreo?",
        "options": [
          "Porque orientan la selección del sensor, la comunicación y la interpretación del dato.",
          "Porque reemplazan todas las pruebas de funcionamiento.",
          "Porque solo sirven para decorar la ficha técnica."
        ],
        "answer": 0,
        "feedback": "La variable condiciona sensor, muestreo, dashboard y criterios de validación."
      },
      {
        "q": "¿Qué debe incluir una arquitectura técnica del prototipo?",
        "options": [
          "Sensores, nodo, protocolo, plataforma, dashboard, seguridad y evidencias.",
          "Solo el nombre del equipo.",
          "Únicamente una imagen sin explicación."
        ],
        "answer": 0,
        "feedback": "La arquitectura evita improvisaciones y permite justificar decisiones técnicas."
      },
      {
        "q": "¿Cuál es un requerimiento funcional típico?",
        "options": [
          "Medir una variable definida y publicar datos periódicos.",
          "Tener un color específico de fondo.",
          "No documentar el funcionamiento."
        ],
        "answer": 0,
        "feedback": "Los requerimientos funcionales describen lo que el sistema debe hacer."
      },
      {
        "q": "¿Qué evidencia demuestra mejor que el sistema funciona?",
        "options": [
          "Diagrama, código comentado, capturas del dashboard y prueba de funcionamiento.",
          "Solo una promesa verbal.",
          "Una imagen ajena al proyecto."
        ],
        "answer": 0,
        "feedback": "Las evidencias deben permitir revisar y evaluar el prototipo."
      }
    ]
  },
  {
    "id": "act8",
    "week": "Semana 4",
    "activity": "Actividad 8",
    "title": "Validación, Documentación y Sustentación de Proyectos IoT",
    "questions": [
      {
        "q": "¿Qué significa validar un sistema IoT?",
        "options": [
          "Comprobar con evidencia que mide, comunica, visualiza y responde coherentemente.",
          "Presentar una diapositiva sin pruebas.",
          "Ocultar errores y limitaciones."
        ],
        "answer": 0,
        "feedback": "Validar implica pruebas ordenadas y evidencias verificables."
      },
      {
        "q": "¿Qué prueba demuestra comunicación extremo a extremo?",
        "options": [
          "Lectura del sensor, publicación MQTT, recepción en plataforma y visualización actualizada.",
          "Solo encender el computador.",
          "Cambiar el nombre del archivo."
        ],
        "answer": 0,
        "feedback": "La comunicación se verifica desde el nodo hasta el dashboard o servicio final."
      },
      {
        "q": "¿Por qué conviene registrar errores y limitaciones?",
        "options": [
          "Porque aportan trazabilidad y permiten proponer mejoras futuras.",
          "Porque disminuyen automáticamente la nota.",
          "Porque reemplazan la sustentación técnica."
        ],
        "answer": 0,
        "feedback": "Las limitaciones también muestran criterio ingenieril cuando se analizan correctamente."
      },
      {
        "q": "¿Qué debe contener una sustentación técnica clara?",
        "options": [
          "Problema, metodología, arquitectura, resultados, evidencias, limitaciones y mejoras.",
          "Solo una demostración sin explicación.",
          "Únicamente el código fuente en pantalla."
        ],
        "answer": 0,
        "feedback": "La sustentación debe conectar el problema con las decisiones técnicas y los resultados."
      },
      {
        "q": "¿Qué diferencia una demostración puntual de un sistema validado?",
        "options": [
          "Pruebas repetibles, datos registrados, continuidad y evidencias documentadas.",
          "Un único dato mostrado sin timestamp.",
          "La ausencia de capturas y documentación."
        ],
        "answer": 0,
        "feedback": "La validación requiere demostrar estabilidad y trazabilidad, no solo funcionamiento momentáneo."
      }
    ]
  }
];
  const app = document.querySelector("#quizApp");
  if (!app) return;

  const storageKey = "iot-course-quiz-progress-v3";
  const loadProgress = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  };
  const saveProgress = progress => localStorage.setItem(storageKey, JSON.stringify(progress));

  let currentIndex = 0;
  let progress = loadProgress();

  function renderShell() {
    app.dataset.ready = "true";
    app.innerHTML = `
      <div class="quiz-tabs" role="tablist" aria-label="Seleccionar cuestionario">
        ${quizData.map((quiz, index) => `
          <button class="quiz-tab" type="button" role="tab" data-quiz-index="${index}" aria-selected="${index === currentIndex}">
            <strong>${quiz.activity}</strong>
            <span>${quiz.week} · ${quiz.title}</span>
            <em class="quiz-score-pill" data-score-for="${quiz.id}">${progress[quiz.id] ? progress[quiz.id].score + "/" + progress[quiz.id].total : "Sin intento"}</em>
          </button>
        `).join("")}
      </div>
      <div class="quiz-panel" role="tabpanel" aria-live="polite">
        <div class="quiz-header" id="quizHeader"></div>
        <form class="quiz-form" id="quizForm"></form>
      </div>
    `;

    app.querySelectorAll(".quiz-tab").forEach(button => {
      button.addEventListener("click", () => {
        currentIndex = Number(button.dataset.quizIndex);
        renderQuiz();
      });
    });

    renderQuiz();
  }

  function renderQuiz() {
    const quiz = quizData[currentIndex];
    const header = app.querySelector("#quizHeader");
    const form = app.querySelector("#quizForm");

    app.querySelectorAll(".quiz-tab").forEach((button, index) => {
      const active = index === currentIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });

    header.innerHTML = `
      <div>
        <p class="eyebrow">${quiz.week} · ${quiz.activity}</p>
        <h3>${quiz.title}</h3>
        <p>Responde las ${quiz.questions.length} preguntas y revisa la retroalimentación para reforzar el tema.</p>
      </div>
      <div class="quiz-progress">${progress[quiz.id] ? "Último puntaje: " + progress[quiz.id].score + "/" + progress[quiz.id].total : "Sin intento registrado"}</div>
    `;

    form.innerHTML = quiz.questions.map((item, qIndex) => `
      <fieldset class="quiz-question" data-question="${qIndex}">
        <legend>${qIndex + 1}. ${item.q}</legend>
        <div class="quiz-options">
          ${item.options.map((option, oIndex) => `
            <label class="quiz-answer" data-option="${oIndex}">
              <input type="radio" name="q${qIndex}" value="${oIndex}">
              <span>${option}</span>
            </label>
          `).join("")}
        </div>
        <div class="quiz-feedback">${item.feedback}</div>
      </fieldset>
    `).join("") + `
      <div class="quiz-actions">
        <button class="btn primary" type="submit">Calificar cuestionario</button>
        <button class="btn secondary" type="button" id="resetQuiz">Reiniciar</button>
        <button class="btn secondary" type="button" id="copyQuizResult">Copiar resultado</button>
        <span class="quiz-result" id="quizResult"></span>
      </div>
    `;

    form.addEventListener("submit", event => {
      event.preventDefault();
      gradeQuiz(quiz, form);
    }, { once: true });

    form.querySelector("#resetQuiz")?.addEventListener("click", () => renderQuiz());
    form.querySelector("#copyQuizResult")?.addEventListener("click", () => copyResult(quiz));
  }

  async function copyResult(quiz) {
    const result = progress[quiz.id];
    const text = result
      ? `${quiz.activity} - ${quiz.title}: ${result.score}/${result.total} (${result.percent}%)`
      : `${quiz.activity} - ${quiz.title}: sin intento registrado`;
    try {
      await navigator.clipboard.writeText(text);
      const target = app.querySelector("#quizResult");
      if (target) target.textContent = "Resultado copiado al portapapeles.";
    } catch {
      const target = app.querySelector("#quizResult");
      if (target) target.textContent = text;
    }
  }

  function gradeQuiz(quiz, form) {
    const resultEl = form.querySelector("#quizResult");
    const unanswered = quiz.questions.some((_, qIndex) => !form.querySelector(`input[name="q${qIndex}"]:checked`));

    if (unanswered) {
      resultEl.innerHTML = `<span class="quiz-warning">Responde todas las preguntas antes de calificar.</span>`;
      form.addEventListener("submit", event => {
        event.preventDefault();
        gradeQuiz(quiz, form);
      }, { once: true });
      return;
    }

    let score = 0;
    quiz.questions.forEach((item, qIndex) => {
      const fieldset = form.querySelector(`[data-question="${qIndex}"]`);
      const selected = Number(form.querySelector(`input[name="q${qIndex}"]:checked`)?.value);
      const isCorrect = selected === item.answer;
      if (isCorrect) score += 1;
      fieldset.classList.add("reviewed");
      fieldset.querySelectorAll(".quiz-answer").forEach(label => {
        const optionIndex = Number(label.dataset.option);
        label.classList.toggle("correct", optionIndex === item.answer);
        label.classList.toggle("wrong", optionIndex === selected && !isCorrect);
        const input = label.querySelector("input");
        if (input) input.disabled = true;
      });
    });

    const percent = Math.round((score / quiz.questions.length) * 100);
    progress[quiz.id] = {
      score,
      total: quiz.questions.length,
      percent,
      date: new Date().toISOString()
    };
    saveProgress(progress);

    resultEl.textContent = `Puntaje: ${score}/${quiz.questions.length} (${percent}%).`;
    const pill = app.querySelector(`[data-score-for="${quiz.id}"]`);
    if (pill) pill.textContent = `${score}/${quiz.questions.length}`;
    const headerProgress = app.querySelector(".quiz-progress");
    if (headerProgress) headerProgress.textContent = `Último puntaje: ${score}/${quiz.questions.length}`;
  }

  renderShell();
})();


// V4: parcial protegido con contraseña del docente.
// V6: Parciales semanales protegidos por contraseña.
// Contraseñas de prueba para docente: Semana 1 = IoT-S1!, Semana 2 = IoT-S2!, Semana 3 = IoT-S3!, Semana 4 = IoT-S4!
(function () {
  const gate = document.querySelector("#partialGate");
  const app = document.querySelector("#partialApp");
  const form = document.querySelector("#partialUnlockForm");
  const passwordInput = document.querySelector("#partialPassword");
  const weekSelect = document.querySelector("#partialWeek");
  const status = document.querySelector("#partialUnlockStatus");
  if (!gate || !app || !form || !passwordInput || !weekSelect || !status) return;

  const partialExams = [
  {
    "id": "s1",
    "title": "Parcial Semana 1",
    "subtitle": "Fundamentos de Redes, IoT, IIoT, TCP/IP y direccionamiento.",
    "passwordHash": "d26cfe31",
    "questions": [
      {
        "q": "¿Cuál es la función principal de una red de datos en una aplicación IoT?",
        "options": [
          "Permitir que dispositivos intercambien información mediante medios y protocolos.",
          "Reemplazar todos los sensores físicos por software.",
          "Eliminar la necesidad de direccionamiento IP.",
          "Convertir automáticamente cualquier dato en una señal analógica."
        ],
        "answer": 0,
        "feedback": "La red conecta nodos, sensores, servidores y usuarios mediante reglas comunes de comunicación."
      },
      {
        "q": "En un sistema IoT, ¿qué elemento convierte una variable física en una señal medible?",
        "options": [
          "El sensor.",
          "El gateway.",
          "El dashboard.",
          "El broker."
        ],
        "answer": 0,
        "feedback": "El sensor transforma variables como temperatura, humedad o presencia en señales que el nodo puede leer."
      },
      {
        "q": "¿Qué diferencia suele caracterizar una solución IIoT frente a una IoT de consumo?",
        "options": [
          "IIoT no utiliza redes.",
          "IIoT exige mayor disponibilidad, robustez y trazabilidad por su impacto operativo.",
          "IIoT solo funciona con páginas web.",
          "IIoT no requiere datos históricos."
        ],
        "answer": 1,
        "feedback": "En entornos industriales las fallas pueden afectar procesos, producción y seguridad operativa."
      },
      {
        "q": "¿Qué representa la dirección IP dentro de una red?",
        "options": [
          "La identificación lógica del dispositivo en la red.",
          "La unidad de medida del sensor.",
          "La contraseña del dashboard.",
          "La velocidad del procesador."
        ],
        "answer": 0,
        "feedback": "La IP permite identificar origen y destino de la comunicación dentro de la red."
      },
      {
        "q": "¿Para qué sirve la máscara de red?",
        "options": [
          "Para determinar qué parte de una IP corresponde a red y qué parte a host.",
          "Para aumentar la humedad medida por el sensor.",
          "Para cifrar automáticamente todos los mensajes MQTT.",
          "Para seleccionar el color del dashboard."
        ],
        "answer": 0,
        "feedback": "La máscara permite saber si un destino está en la misma subred o si se necesita gateway."
      },
      {
        "q": "¿Cuál es la función del gateway en una red IP?",
        "options": [
          "Permitir la comunicación con otras redes fuera de la red local.",
          "Medir directamente temperatura y humedad.",
          "Reemplazar la dirección IP del servidor.",
          "Convertir MQTT en HTTP."
        ],
        "answer": 0,
        "feedback": "El gateway es la salida hacia redes externas, por ejemplo Internet o una nube IoT."
      },
      {
        "q": "¿Qué función cumple DNS en una aplicación conectada a Internet?",
        "options": [
          "Traducir nombres de dominio a direcciones IP.",
          "Medir la latencia del sensor.",
          "Crear automáticamente un dashboard.",
          "Eliminar la necesidad de puertos."
        ],
        "answer": 0,
        "feedback": "DNS permite usar nombres como broker.ejemplo.com en vez de recordar una IP numérica."
      },
      {
        "q": "¿Qué identifica un puerto en TCP/IP?",
        "options": [
          "El servicio o aplicación dentro de un dispositivo.",
          "La ubicación física del sensor.",
          "La marca del microcontrolador.",
          "El nivel de batería del ESP32."
        ],
        "answer": 0,
        "feedback": "La IP identifica el equipo y el puerto identifica el servicio, como HTTP, HTTPS o MQTT."
      },
      {
        "q": "Si un ESP32 se conecta al WiFi pero no envía datos al broker, ¿qué conviene revisar primero?",
        "options": [
          "IP, gateway, DNS, dirección del broker, puerto y conectividad extremo a extremo.",
          "Solo el color de los cables.",
          "El nombre del archivo de la presentación.",
          "La estética de la página de inicio."
        ],
        "answer": 0,
        "feedback": "La falla puede estar en direccionamiento, resolución DNS, gateway, puerto o disponibilidad del servicio."
      },
      {
        "q": "¿Qué evidencia corresponde a la Semana 1 del Proyecto IoT?",
        "options": [
          "Ficha inicial del proyecto y diagrama básico de arquitectura.",
          "Sustentación final completa.",
          "Dashboard histórico definitivo.",
          "Informe final de validación."
        ],
        "answer": 0,
        "feedback": "La Semana 1 debe cerrar con problema, variable, sensor, nodo, usuario y arquitectura inicial."
      }
    ]
  },
  {
    "id": "s2",
    "title": "Parcial Semana 2",
    "subtitle": "Protocolos IoT, MQTT, tópicos, broker, QoS y payload.",
    "passwordHash": "6a6a1be2",
    "questions": [
      {
        "q": "¿Qué modelo de comunicación caracteriza a HTTP?",
        "options": [
          "Petición/respuesta.",
          "Publicador/suscriptor puro.",
          "Solo broadcast de capa física.",
          "Comunicación sin cliente."
        ],
        "answer": 0,
        "feedback": "HTTP se usa normalmente como modelo cliente-servidor de petición y respuesta."
      },
      {
        "q": "¿Qué protocolo es especialmente adecuado para telemetría periódica ligera en IoT?",
        "options": [
          "MQTT.",
          "FTP.",
          "SMTP.",
          "ARP."
        ],
        "answer": 0,
        "feedback": "MQTT es ligero y usa publicación/suscripción, por eso es común en sensores IoT."
      },
      {
        "q": "¿Cuándo conviene usar WebSocket en un sistema IoT?",
        "options": [
          "Cuando se requiere una conexión persistente para actualizar interfaces en tiempo real.",
          "Cuando no existe comunicación de red.",
          "Cuando se desea eliminar el servidor.",
          "Cuando el sensor debe trabajar sin energía."
        ],
        "answer": 0,
        "feedback": "WebSocket permite comunicación bidireccional persistente, útil para dashboards en tiempo real."
      },
      {
        "q": "En MQTT, ¿qué función cumple el broker?",
        "options": [
          "Recibir, enrutar y entregar mensajes entre publishers y subscribers.",
          "Medir directamente las variables físicas.",
          "Diseñar automáticamente el circuito electrónico.",
          "Evitar el uso de tópicos."
        ],
        "answer": 0,
        "feedback": "El broker desacopla productores y consumidores de datos mediante tópicos."
      },
      {
        "q": "¿Qué representa un tópico MQTT?",
        "options": [
          "Una ruta lógica para publicar o suscribirse a información.",
          "Una contraseña del WiFi.",
          "Una unidad de temperatura.",
          "Un tipo de cable Ethernet."
        ],
        "answer": 0,
        "feedback": "Los tópicos organizan los mensajes, por ejemplo uan/sede/lab1/nodo01/temperatura."
      },
      {
        "q": "¿Cuál es una buena práctica para diseñar tópicos MQTT?",
        "options": [
          "Usar jerarquías consistentes por institución, sede, laboratorio, nodo y variable.",
          "Usar nombres aleatorios en cada publicación.",
          "Mezclar credenciales dentro del tópico.",
          "Cambiar el tópico en cada lectura."
        ],
        "answer": 0,
        "feedback": "Una jerarquía ordenada facilita escalabilidad, filtrado, mantenimiento y diagnóstico."
      },
      {
        "q": "¿Qué debe incluir un payload JSON mínimo para el proyecto?",
        "options": [
          "Variable, valor, unidad, timestamp y estado del nodo o lectura.",
          "Solo una imagen decorativa.",
          "La contraseña del profesor.",
          "La dirección MAC escrita a mano sin datos."
        ],
        "answer": 0,
        "feedback": "Un payload claro mejora trazabilidad, interpretación y validación del dato."
      },
      {
        "q": "¿Qué implica QoS 1 en MQTT?",
        "options": [
          "Entrega al menos una vez, con posibilidad de duplicados.",
          "Entrega exactamente cero veces.",
          "Elimina el broker.",
          "Convierte el mensaje a HTML."
        ],
        "answer": 0,
        "feedback": "QoS 1 busca asegurar entrega, aunque puede generar mensajes duplicados."
      },
      {
        "q": "¿Para qué sirve Last Will and Testament en MQTT?",
        "options": [
          "Para publicar un mensaje de desconexión inesperada del cliente.",
          "Para cambiar la unidad de la humedad.",
          "Para diseñar el dashboard automáticamente.",
          "Para reemplazar el sensor."
        ],
        "answer": 0,
        "feedback": "LWT permite detectar y reportar caídas inesperadas de un nodo."
      },
      {
        "q": "¿Qué evidencia corresponde a la Semana 2 del Proyecto IoT?",
        "options": [
          "Protocolo seleccionado, topic tree, payload JSON y prueba de publicación.",
          "Informe final impreso sin pruebas.",
          "Rúbrica docente del curso.",
          "Solo una fotografía del aula."
        ],
        "answer": 0,
        "feedback": "La Semana 2 debe demostrar el diseño y la prueba básica de comunicación de datos."
      }
    ]
  },
  {
    "id": "s3",
    "title": "Parcial Semana 3",
    "subtitle": "Plataformas IoT, flujo de datos, dashboards, calidad y seguridad.",
    "passwordHash": "4667a49f",
    "questions": [
      {
        "q": "¿Cuál es una función típica de una plataforma IoT?",
        "options": [
          "Integrar datos, aplicar lógica, almacenar históricos y visualizar información.",
          "Eliminar todos los protocolos.",
          "Impedir el uso de sensores.",
          "Convertir el ESP32 en un router."
        ],
        "answer": 0,
        "feedback": "La plataforma convierte mensajes en información organizada, visualizable y accionable."
      },
      {
        "q": "¿Por qué Node-RED es útil en prototipos IoT?",
        "options": [
          "Porque permite construir flujos visuales e integrar MQTT, HTTP, bases de datos y dashboards.",
          "Porque evita toda programación y elimina la red.",
          "Porque solo sirve para diseño gráfico.",
          "Porque reemplaza al sensor físico."
        ],
        "answer": 0,
        "feedback": "Node-RED facilita la integración y el procesamiento visual de flujos de datos."
      },
      {
        "q": "¿Cuándo se justifica una base de datos en un sistema IoT?",
        "options": [
          "Cuando se requiere histórico, trazabilidad, análisis de tendencias y revisión de continuidad.",
          "Cuando no se desea guardar nada.",
          "Cuando no hay variables medidas.",
          "Cuando el dashboard no tendrá datos."
        ],
        "answer": 0,
        "feedback": "La base de datos permite analizar comportamiento histórico y validar continuidad."
      },
      {
        "q": "¿Qué elementos debe mostrar un dashboard mínimo del proyecto?",
        "options": [
          "Valor actual, unidad, timestamp, estado, tendencia y al menos una alerta.",
          "Solo un título decorativo.",
          "Únicamente el nombre del estudiante.",
          "Un enlace externo sin datos."
        ],
        "answer": 0,
        "feedback": "El dashboard debe ayudar a interpretar el estado real del sistema y no solo mostrar un número."
      },
      {
        "q": "¿Por qué el timestamp es crítico en IoT?",
        "options": [
          "Porque permite saber si el dato está actualizado o si el dashboard está mostrando un valor antiguo.",
          "Porque reemplaza la medición física.",
          "Porque evita configurar el WiFi.",
          "Porque elimina la necesidad de sensor."
        ],
        "answer": 0,
        "feedback": "Sin timestamp, un valor visible puede generar falsa sensación de normalidad."
      },
      {
        "q": "¿Qué significa continuidad de datos?",
        "options": [
          "Que las lecturas lleguen con la frecuencia esperada y sin huecos no explicados.",
          "Que todos los datos tengan el mismo color.",
          "Que el sensor no necesite conexión.",
          "Que el dashboard no cambie nunca."
        ],
        "answer": 0,
        "feedback": "La continuidad permite detectar interrupciones, latencia o fallas de transmisión."
      },
      {
        "q": "¿Cuál es un riesgo frecuente en prototipos IoT?",
        "options": [
          "Broker sin autenticación, contraseñas débiles o puertos expuestos.",
          "Usar unidades de medida claras.",
          "Documentar los resultados.",
          "Validar rangos de los datos."
        ],
        "answer": 0,
        "feedback": "La seguridad debe considerarse desde el prototipo, aunque sea académico."
      },
      {
        "q": "¿Cuál es un control básico de seguridad para MQTT?",
        "options": [
          "Usar usuarios, claves robustas y TLS cuando sea posible.",
          "Publicar las claves en el dashboard.",
          "Dejar el broker abierto sin control.",
          "Usar todos los puertos disponibles."
        ],
        "answer": 0,
        "feedback": "Autenticación y cifrado reducen riesgos de acceso no autorizado y manipulación."
      },
      {
        "q": "¿Qué indicador ayuda a evitar que un dashboard congelado parezca normal?",
        "options": [
          "Estado de actualización o alerta por ausencia de datos recientes.",
          "Un fondo más llamativo.",
          "Un logo más grande.",
          "Ocultar la fecha de la lectura."
        ],
        "answer": 0,
        "feedback": "El sistema debe alertar si no llegan datos dentro del intervalo esperado."
      },
      {
        "q": "¿Qué evidencia corresponde a la Semana 3 del Proyecto IoT?",
        "options": [
          "Dashboard funcional, flujo de datos, alerta, criterios de calidad y seguridad básica.",
          "Solo la idea inicial del proyecto.",
          "Un examen sin relación con el prototipo.",
          "Una lista de compras sin pruebas."
        ],
        "answer": 0,
        "feedback": "La Semana 3 debe mostrar integración entre plataforma, visualización, calidad y seguridad."
      }
    ]
  },
  {
    "id": "s4",
    "title": "Parcial Semana 4",
    "subtitle": "Diseño técnico, validación, documentación y sustentación del proyecto.",
    "passwordHash": "5e658bd0",
    "questions": [
      {
        "q": "¿Qué hace que un problema sea adecuado para un proyecto IoT académico?",
        "options": [
          "Que sea real, medible y abordable mediante monitoreo, alerta o análisis de datos.",
          "Que no tenga variables.",
          "Que no pueda evaluarse.",
          "Que dependa solo de una imagen."
        ],
        "answer": 0,
        "feedback": "El proyecto debe partir de una necesidad concreta que pueda evidenciarse con datos."
      },
      {
        "q": "¿Por qué se deben definir unidad, rango y frecuencia de muestreo de la variable?",
        "options": [
          "Porque orientan la selección del sensor, la interpretación del dato y la validación.",
          "Porque sustituyen la arquitectura.",
          "Porque eliminan el protocolo.",
          "Porque impiden construir el dashboard."
        ],
        "answer": 0,
        "feedback": "Sin criterios de medición, el dato puede ser ambiguo o no verificable."
      },
      {
        "q": "¿Qué debe contener la ficha técnica del proyecto?",
        "options": [
          "Problema, objetivo, variables, sensores, nodo, protocolo, plataforma, dashboard y evidencias.",
          "Solo el título del curso.",
          "Únicamente una captura del navegador.",
          "La contraseña del parcial."
        ],
        "answer": 0,
        "feedback": "La ficha técnica ordena las decisiones de diseño antes de implementar o cerrar el prototipo."
      },
      {
        "q": "¿Qué evidencia demuestra comunicación extremo a extremo?",
        "options": [
          "Lectura del sensor, publicación, recepción en plataforma y visualización actualizada.",
          "Solo una presentación sin pruebas.",
          "Un código que nunca se ejecutó.",
          "Una tabla vacía."
        ],
        "answer": 0,
        "feedback": "La validación debe mostrar el recorrido completo del dato desde el sensor hasta el dashboard."
      },
      {
        "q": "¿Por qué conviene probar por etapas?",
        "options": [
          "Porque permite ubicar fallas en sensor, red, broker, plataforma o dashboard.",
          "Porque elimina la necesidad de documentación.",
          "Porque evita seleccionar protocolo.",
          "Porque hace innecesario el sensor."
        ],
        "answer": 0,
        "feedback": "Las pruebas por etapa facilitan diagnóstico y evidencias de funcionamiento."
      },
      {
        "q": "¿Qué tipo de evidencia debe incluir el informe técnico?",
        "options": [
          "Diagrama de arquitectura, código comentado, configuración, capturas, pruebas y limitaciones.",
          "Solo opiniones sin datos.",
          "La portada de la presentación.",
          "Una imagen sin descripción."
        ],
        "answer": 0,
        "feedback": "Las evidencias permiten revisar, reproducir y evaluar el prototipo."
      },
      {
        "q": "¿Por qué es importante registrar errores o limitaciones?",
        "options": [
          "Porque muestran análisis técnico, trazabilidad y oportunidades de mejora.",
          "Porque reemplazan las pruebas exitosas.",
          "Porque impiden evaluar el proyecto.",
          "Porque ocultan resultados."
        ],
        "answer": 0,
        "feedback": "Reconocer limitaciones es parte del criterio ingenieril y mejora la calidad de la sustentación."
      },
      {
        "q": "¿Qué debe explicar una sustentación técnica clara?",
        "options": [
          "Problema, arquitectura, metodología, resultados, evidencias, limitaciones y mejoras futuras.",
          "Solo el nombre del equipo.",
          "Solo el color del dashboard.",
          "Una definición aislada de IoT."
        ],
        "answer": 0,
        "feedback": "La sustentación debe demostrar funcionamiento y justificar decisiones técnicas."
      },
      {
        "q": "¿Qué diferencia una demostración puntual de un sistema validado?",
        "options": [
          "La existencia de pruebas, registros, evidencias y criterios de funcionamiento verificables.",
          "El tamaño de la pantalla usada.",
          "La cantidad de colores del gráfico.",
          "La duración del video de presentación."
        ],
        "answer": 0,
        "feedback": "Un sistema validado muestra funcionamiento verificable, no solo un momento aislado."
      },
      {
        "q": "¿Qué evidencia corresponde a la Semana 4 del Proyecto IoT?",
        "options": [
          "Prototipo validado, informe técnico, lista de chequeo y sustentación final.",
          "Solo la elección del sensor.",
          "Primer bosquejo del problema.",
          "Prueba de WiFi sin dashboard."
        ],
        "answer": 0,
        "feedback": "La Semana 4 se concentra en validar, documentar y sustentar el proyecto construido desde el inicio."
      }
    ]
  }
];

  const stateKey = "iot-weekly-partials-v6";

  function simpleHash(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function getState() {
    try {
      return JSON.parse(localStorage.getItem(stateKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveState(state) {
    localStorage.setItem(stateKey, JSON.stringify(state));
  }

  function getExam(id) {
    return partialExams.find(exam => exam.id === id) || partialExams[0];
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.classList.remove("error", "ok");
    if (type) status.classList.add(type);
  }

  function unlockExam(examId) {
    const state = getState();
    state[examId] = {
      ...(state[examId] || {}),
      unlocked: true,
      unlockedAt: new Date().toISOString()
    };
    saveState(state);
    renderPartial(examId);
    gate.hidden = true;
    app.hidden = false;
    setTimeout(() => app.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const examId = weekSelect.value;
    const exam = getExam(examId);
    const candidate = passwordInput.value.trim();

    if (!candidate) {
      setStatus("Ingrese la contraseña indicada por el profesor.", "error");
      return;
    }

    if (simpleHash(candidate) !== exam.passwordHash) {
      setStatus("Contraseña incorrecta para " + exam.title + ". Verifique mayúsculas, minúsculas y símbolos.", "error");
      passwordInput.select();
      return;
    }

    setStatus(exam.title + " habilitado correctamente.", "ok");
    unlockExam(examId);
  });

  function getStoredResult(examId) {
    const state = getState();
    return state[examId]?.result || null;
  }

  function setStoredResult(examId, result) {
    const state = getState();
    state[examId] = {
      ...(state[examId] || {}),
      unlocked: true,
      result
    };
    saveState(state);
  }

  function isUnlocked(examId) {
    return Boolean(getState()[examId]?.unlocked);
  }

  function renderTabs(currentId) {
    return `
      <div class="partial-week-tabs" role="tablist" aria-label="Seleccionar parcial semanal">
        ${partialExams.map(exam => `
          <button class="partial-week-tab ${exam.id === currentId ? "active" : ""}" type="button" data-partial-tab="${exam.id}">
            ${exam.title}${isUnlocked(exam.id) ? " · habilitado" : ""}
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderPartial(examId) {
    const exam = getExam(examId);
    const previous = getStoredResult(exam.id);

    app.innerHTML = `
      <div class="partial-header">
        <div>
          <p class="eyebrow">Evaluación semanal</p>
          <h3>${exam.title}</h3>
          <p>${exam.subtitle} Responde las ${exam.questions.length} preguntas. La retroalimentación se muestra después de enviar el parcial.</p>
        </div>
        <div class="partial-badge">${previous ? "Último puntaje: " + previous.score + "/" + previous.total : "Sin intento registrado"}</div>
      </div>

      ${renderTabs(exam.id)}

      ${previous ? `
        <div class="partial-summary" id="partialPreviousSummary">
          <h4>Resultado guardado</h4>
          <p><strong>Estudiante:</strong> ${previous.student || "No registrado"}</p>
          <p><strong>Parcial:</strong> ${exam.title}</p>
          <p><strong>Puntaje:</strong> ${previous.score}/${previous.total} (${previous.percent}%)</p>
          <p><strong>Fecha:</strong> ${new Date(previous.date).toLocaleString("es-CO")}</p>
        </div>
      ` : ""}

      <form class="partial-form" id="partialForm">
        <div class="partial-student">
          <label for="partialStudent">Nombre del estudiante o equipo</label>
          <input id="partialStudent" name="partialStudent" type="text" minlength="3" placeholder="Nombre completo o equipo" required value="${previous?.student || ""}">
        </div>

        ${exam.questions.map((item, qIndex) => `
          <fieldset class="partial-question" data-partial-question="${qIndex}">
            <legend>${qIndex + 1}. ${item.q}</legend>
            <div class="partial-options">
              ${item.options.map((option, optionIndex) => `
                <label class="partial-answer" data-option="${optionIndex}">
                  <input type="radio" name="pq${qIndex}" value="${optionIndex}">
                  <span>${option}</span>
                </label>
              `).join("")}
            </div>
            <p class="partial-feedback">${item.feedback}</p>
          </fieldset>
        `).join("")}

        <div class="partial-actions">
          <button class="btn primary" type="submit">Enviar parcial</button>
          <button class="btn secondary" type="button" id="copyPartialResult">Copiar resultado</button>
          <button class="btn ghost" type="button" id="resetPartial">Nuevo intento</button>
          <button class="btn ghost" type="button" id="lockPartial">Bloquear este parcial</button>
          <button class="btn ghost" type="button" id="backToGate">Cambiar parcial</button>
          <span class="partial-result" id="partialResult"></span>
        </div>
      </form>
    `;

    app.querySelectorAll("[data-partial-tab]").forEach(button => {
      button.addEventListener("click", () => {
        const requestedId = button.dataset.partialTab;
        if (isUnlocked(requestedId)) {
          renderPartial(requestedId);
        } else {
          app.hidden = true;
          gate.hidden = false;
          weekSelect.value = requestedId;
          passwordInput.value = "";
          setStatus("Ingrese la contraseña para habilitar " + getExam(requestedId).title + ".", "ok");
          gate.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    const partialForm = app.querySelector("#partialForm");
    partialForm?.addEventListener("submit", event => {
      event.preventDefault();
      gradePartial(partialForm, exam);
    });

    app.querySelector("#copyPartialResult")?.addEventListener("click", () => copyPartialResult(exam));

    app.querySelector("#resetPartial")?.addEventListener("click", () => {
      const state = getState();
      if (state[exam.id]) delete state[exam.id].result;
      saveState(state);
      renderPartial(exam.id);
    });

    app.querySelector("#lockPartial")?.addEventListener("click", () => {
      const state = getState();
      if (state[exam.id]) state[exam.id].unlocked = false;
      saveState(state);
      app.hidden = true;
      gate.hidden = false;
      weekSelect.value = exam.id;
      passwordInput.value = "";
      setStatus(exam.title + " bloqueado nuevamente.", "ok");
      gate.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    app.querySelector("#backToGate")?.addEventListener("click", () => {
      app.hidden = true;
      gate.hidden = false;
      weekSelect.value = exam.id;
      passwordInput.value = "";
      setStatus("Seleccione el parcial que desea habilitar o revisar.", "ok");
      gate.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function gradePartial(partialForm, exam) {
    const resultEl = partialForm.querySelector("#partialResult");
    const student = String(partialForm.querySelector("#partialStudent")?.value || "").trim();
    if (student.length < 3) {
      resultEl.innerHTML = `<span class="quiz-warning">Ingrese el nombre del estudiante o equipo.</span>`;
      return;
    }

    const unanswered = exam.questions.some((_, qIndex) => !partialForm.querySelector(`input[name="pq${qIndex}"]:checked`));
    if (unanswered) {
      resultEl.innerHTML = `<span class="quiz-warning">Responde todas las preguntas antes de enviar.</span>`;
      return;
    }

    let score = 0;
    exam.questions.forEach((item, qIndex) => {
      const fieldset = partialForm.querySelector(`[data-partial-question="${qIndex}"]`);
      const selected = Number(partialForm.querySelector(`input[name="pq${qIndex}"]:checked`)?.value);
      const isCorrect = selected === item.answer;
      if (isCorrect) score += 1;

      fieldset.classList.add("reviewed");
      fieldset.querySelectorAll(".partial-answer").forEach(label => {
        const optionIndex = Number(label.dataset.option);
        label.classList.toggle("correct", optionIndex === item.answer);
        label.classList.toggle("wrong", optionIndex === selected && !isCorrect);
        const input = label.querySelector("input");
        if (input) input.disabled = true;
      });
    });

    const percent = Math.round((score / exam.questions.length) * 100);
    const result = {
      examId: exam.id,
      examTitle: exam.title,
      student,
      score,
      total: exam.questions.length,
      percent,
      date: new Date().toISOString()
    };
    setStoredResult(exam.id, result);

    resultEl.textContent = `Puntaje final: ${score}/${exam.questions.length} (${percent}%).`;
    const badge = app.querySelector(".partial-badge");
    if (badge) badge.textContent = `Último puntaje: ${score}/${exam.questions.length}`;
  }

  async function copyPartialResult(exam) {
    const result = getStoredResult(exam.id);
    const resultEl = app.querySelector("#partialResult");
    const text = result
      ? `${exam.title} | Estudiante: ${result.student} | Puntaje: ${result.score}/${result.total} (${result.percent}%) | Fecha: ${new Date(result.date).toLocaleString("es-CO")}`
      : `${exam.title}: sin intento registrado.`;

    try {
      await navigator.clipboard.writeText(text);
      if (resultEl) resultEl.textContent = "Resultado copiado al portapapeles.";
    } catch {
      if (resultEl) resultEl.textContent = text;
    }
  }

  const initialUnlocked = partialExams.find(exam => isUnlocked(exam.id));
  if (initialUnlocked) {
    gate.hidden = true;
    app.hidden = false;
    renderPartial(initialUnlocked.id);
  }
})();

