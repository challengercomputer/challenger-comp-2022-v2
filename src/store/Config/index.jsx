class Config{

    static challengers__title = "Challenger Computers";
    static challengers__sub = "Design &amp; Build your own PC";
    static challengers__excerpt = "We are everything from building gaming PCs to buying laptops.";
    static challengers__desc = "Design & Build. your own PC";
    static challengers__websiteType = "Pc Build Website";
    static challengers__copyright = "© 2021 Challenger Computers | All rights reserved";



    static numFormatter(num) {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(1).replace(/\.?0+$/, '') + 'K'; // convert to K for number from > 1000 < 1 million 
        }else if(num > 1000000){
            return (num/1000000).toFixed(1).replace(/\.?0+$/, '') + 'M'; // convert to M for number from > 1 million 
        }else return num; // if value < 1000, nothing to do
      }

      static timeFormatter(num) {
        var sec_num = parseInt(num, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }

    static filesizeFormatter(bytes,decimalPoint) {
      if(bytes === 0) return '0 Bytes';
      var k = 1000,
          dm = decimalPoint || 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
   }
    
    static truncate(str, count) {
        var subsc = (count - 3);
        return str.length > count ? str.substring(0, subsc) + "..." : str;      
    }

    static LowerCase(text) {
        let str = text;
        str.toLowerCase();
        return str;
    }

    static UpperCase(text) {
        let str = text;
        str.toLowerCase();
        return str;
    }

static getSinceTime(time) {

    switch (typeof time) {
        case 'number':
        break;
        case 'string':
        time = +new Date(time);
        break;
        case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
        default:
        time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;
    
    if (seconds === 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while (format === time_formats[i++])
        if (seconds < format[0]) {
        if (typeof format[2] === 'string')
            return format[list_choice];
        else
            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
    }
}
export default Config;