export function checkHeading(str) {
            return /^(\*)(\*)(.*)\*$/.test(str);
      }

export      function replaceHeadingstar(str) {
            return str.replace(/^(\*\*|\*&)/,'') 
      }