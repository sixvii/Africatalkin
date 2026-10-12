// Multi-language support for SMS messages
export const languages = {
  en: 'English',
  sw: 'Kiswahili',
  ki: 'Kikuyu',
  lu: 'Luo'
}

export const translations = {
  en: {
    weather_alert: "WEATHER ALERT: {condition} expected. {temperature}°C. {advice}",
    market_update: "MARKET UPDATE: {crop} - NAIRA {price}/{unit} ({change}). {location} market.",
    farming_tip: "FARMING TIP: {tip}",
    livestock_alert: "LIVESTOCK: {message}",
    finance_calc: "FINANCE: {calculation}",
    group_message: "GROUP: {message}"
  },
  sw: {
    weather_alert: "OYO, IBADAN: {condition} inatarajiwa. {temperature}°C. {advice}",
    market_update: "HABARI ZA SOKO: {crop} - NAIRA {price}/{unit} ({change}). Soko la {location}.",
    farming_tip: "USHAURI WA KILIMO: {tip}",
    livestock_alert: "MIFUGO: {message}",
    finance_calc: "FEDHA: {calculation}",
    group_message: "KIKUNDI: {message}"
  },
  ki: {
    weather_alert: "MWĨHOKO WA KĨRĨA: {condition} gũkwĩrĩgĩrĩra. {temperature}°C. {advice}",
    market_update: "ŨHORO WA NDŨNYŨ: {crop} - KES {price}/{unit} ({change}). Ndũnyũ ya {location}.",
    farming_tip: "KĨRĨRA KĨA ŨRĨMI: {tip}",
    livestock_alert: "MAHIŨ: {message}",
    finance_calc: "MBEECA: {calculation}",
    group_message: "GĨKUNDI: {message}"
  },
  lu: {
    weather_alert: "SIEM MAR YAMO: {condition} paro ni. {temperature}°C. {advice}",
    market_update: "WACH MAR CHIRO: {crop} - KES {price}/{unit} ({change}). Chiro mar {location}.",
    farming_tip: "PUONJ MAR PUR: {tip}",
    livestock_alert: "JAMNI: {message}",
    finance_calc: "PESA: {calculation}",
    group_message: "OGANDA: {message}"
  }
}

export const translateMessage = (template, language, variables) => {
  let message = translations[language]?.[template] || translations.en[template]
  
  Object.keys(variables).forEach(key => {
    message = message.replace(`{${key}}`, variables[key])
  })
  
  return message
}
