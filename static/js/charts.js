'use strict';

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//Polar Area
$.get('/coin_counts.json', res=>{
  //console.log(res.data);
  const labels_array = Object.keys(res.data);
  const data_array = [];
  const backg_color = []
  for (const item in res.data){
    data_array.push(res.data[item]);
    backg_color.push(`rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`)
  }

  const data = {
    labels: labels_array,
    datasets: [{
      label: 'This Better Work',
      data: data_array,
      backgroundColor: backg_color
    }]
    
  };
  new Chart($('#polar'), {
    type: 'polarArea',
    data: data,
    options: {}
  });

}) //end polar area graph.

// Attempt at stacked bar
$.get('/data_by_user.json', res => {
  const res_data = res.data;
  const data_array_of_dicts = [];
  //data_dict set up this way because of structe of how data is needed for the graph
  
  //console.log(res.data);
  const data_dict_labels = [];
  for (const elem in res_data){
    for (const el in res_data[elem]){
      if (data_dict_labels.indexOf(el)=== -1){
        data_dict_labels.push(el)
      }
    }
  }
  let data_dict = {'label':'','data':[], 'backgroundColor':''}

  for (const i of data_dict_labels){
    data_dict['label'] = i;
    data_dict['backgroundColor'] = `rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`;
    data_array_of_dicts.push(data_dict);
    data_dict = {'label':'','data':[], 'backgroundColor':''}
  }
  
  for (const elem in res_data){
    for (const item of data_array_of_dicts){
      console.log(item);
      for (const coin in res_data[elem]) {
        //console.log(item['label']);
        if (coin === item['label']);
          //console.log(coin);
          // console.log(res_data[elem]);
          //console.log(`item label ${item['label']}`);
          item['data'].push(res_data[elem][coin]);
      }
      
    }
    
  }
  console.log(data_array_of_dicts);


  //Graph DATA
    const data = {
        labels:labels,
        datasets : data_array_of_dicts
    };

    new Chart($('#stackedbar'), {
        type: 'bar',
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Money Type Found Per Day'
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }
      });
      

}); //end stacked bar


// //regular bar graph
// $.get('/data_by_user.json', res =>{
//   //console.log(res.data);
//   const weekly_array = [];
//   let daily_tally= 0;
//   for (const item in res.data){
//     for (const elem in res.data[item]){
//       daily_tally += res.data[item][elem];
//     }
//     weekly_array.push(daily_tally);
//     daily_tally = 0;
//   }


//   const data = {
//     labels: labels,
//     datasets: [{
//       //label: lables,
//       data: weekly_array,
//       backgroundColor: colors

//     }]
//   };

//   new Chart($('#stackedbar'), {
//     type: 'bar',
//     data: data,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     },
//   });
// });

