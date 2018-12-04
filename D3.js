scatter = function(data){
  //This creates an array of years for the x-axis values
  var years = [];
  var i = 1856;
  while (i < 1980){
    years.push(i);
    i += 4;
  }

  //this creates the canvas
  var canvas = d3.select('#chart')
                 .append('svg')
                 .attr('height', 1000)
                 .attr('width', 1000);


  var xScale = d3.time.scale()
                  .domain([new Date(1856,1,1),new Date(1976,1,1)])
                  .range([0,500]);



  var yMin = 0;
  var yMax = 100;
  var yScale = d3.scale.linear()
                  .domain([yMax,yMin])
                  .range([0,500]);

  var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient('left');

  var xAxis = d3.svg.axis()
                .scale(xScale);

  var wrapper = canvas.append('g');
  wrapper.attr('transform','translate(50,50)');
  wrapper.append('g')
        .attr('transform','translate(0,500)')
        .call(xAxis);

  wrapper.append('g')
         .call(yAxis);

  //now render our data on the plot
  var republicanPoints = wrapper.selectAll('circle')
         .data(data)
         .enter()
         .append('circle')
         .attr('fill', '#dcc88d');

  data.forEach(function(val,i){
    if (i < data.length - 1){
      wrapper.append('line')
             .attr('x1',xScale(new Date(years[i],1,1)))
             .attr('x2',xScale(new Date(years[i+1],1,1)))
             .attr('y1',yScale(data[i]))
             .attr('y2',yScale(data[i+1]))
             .attr('stroke', '#dcc88d')
    }
  })

  var democratsPoints = wrapper.selectAll('rect')
         .data(data)
         .enter()
         .append('circle')
         .attr('x',function(d,i){
          return xScale(new Date(years[i],1,1))-5;
         })
         .attr('y',function(d,i){
            return yScale(100-d)-5;
         })
         .attr('fill', '#8CDBA0');

  data.forEach(function(val,i){
    if (i < data.length - 1){
      wrapper.append('line')
             .attr('x1',xScale(new Date(years[i],1,1)))
             .attr('x2',xScale(new Date(years[i+1],1,1)))
             .attr('y1',yScale(100-data[i]))
             .attr('y2',yScale(100-data[i+1]))
             .attr('stroke', '#8CDBA0')
    }
  })
return canvas;
}