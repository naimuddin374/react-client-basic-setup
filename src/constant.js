export const APP_NAME = "arotkrishi.com";
export const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
export const API = `${process.env.REACT_APP_BASE_URL}/api`;

export const getHttpErrorMessage = (response, e) => {
  switch (response.status) {
    case 400:
      return "Bad Request.";
    case 401:
      return "Unauthorised access!";
    case 402:
      return "Payment Required!";
    case 403:
      return "Request Forbidden!"; // "CSRF verification failed. Request aborted.";
    case 404:
      return "Not Found!";
    case 405:
      return "Method Not Allowed!";
    case 408:
      return "Request Timeout!";
    case 415:
      return "Unsupported Media Type!";
    case 444:
      return "No Response!";
    case 500:
      return "Internal Server Error!";
    case 502:
      return "Bad Gateway!";
    case 503:
      return "Service Unavailable!";
    case 504:
      return "Gateway Timeout!";
    default:
      return e.message || "Something went wrong!";
  }
};

export const handleResponse = (response) => {
  //console.log(response);
  return response.text().then(res => {
    let data = "";
    try {
      data = res && JSON.parse(res);
    } catch (e) {
      return Promise.reject(getHttpErrorMessage(response, e));
    }
    if (!response.ok) {
      if (response.status === 401) {
        // localStorage.removeItem('credential');
        return Promise.reject(getHttpErrorMessage(response));
      }

      //console.log(JSON.parse(res)['non_field_errors'])

      const error = (data && data.detail) || JSON.parse(res).error || response.statusText || JSON.parse(res)['non_field_errors'][0] || res;
      return Promise.reject(error);
    }

    if (data.hasOwnProperty("error")) return Promise.reject(data.error);

    return data;
  });
};

export const appendLeadingZeroes = (n) => {
  if (n <= 9) {
    return "0" + n;
  }
  return n
};

let a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
let b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

export const inWords = (num) => {
  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; var str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'taka only ' : '';
  return str;
};

let numbers = { '০': 0, '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6, '৭': 7, '৮': 8, '৯': 9 };

export const replaceBnToEnNumbers = (input) => {
  let output = [];
  for (let i = 0; i < input.length; ++i) {
    if (numbers.hasOwnProperty(input[i])) {
      output.push(numbers[input[i]]);
    } else {
      output.push(input[i]);
    }
  }
  return output.join('');
};

