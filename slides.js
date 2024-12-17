// slides.js

const slides = [
    {
        title: "Sine Function (sin θ)",
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
                 <mrow>
                   <mi>sin</mi>
                   <mo>&#x2062;</mo>
                   <mi>&#x03B8;</mi>
                   <mo>=</mo>
                   <mfrac>
                     <mtext>opposite</mtext>
                     <mtext>hypotenuse</mtext>
                   </mfrac>
                 </mrow>
               </math>`
    },
    {
        title: "Cosine Function (cos θ)",
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
                 <mrow>
                   <mi>cos</mi>
                   <mo>&#x2062;</mo>
                   <mi>&#x03B8;</mi>
                   <mo>=</mo>
                   <mfrac>
                     <mtext>adjacent</mtext>
                     <mtext>hypotenuse</mtext>
                   </mfrac>
                 </mrow>
               </math>`
    },
    {
        title: "Tangent Function (tan θ)",
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
                 <mrow>
                   <mi>tan</mi>
                   <mo>&#x2062;</mo>
                   <mi>&#x03B8;</mi>
                   <mo>=</mo>
                   <mfrac>
                     <mtext>opposite</mtext>
                     <mtext>adjacent</mtext>
                   </mfrac>
                 </mrow>
               </math>`
    },
    {
        title: "Cosecant Function (csc θ)",
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
                 <mrow>
                   <mi>csc</mi>
                   <mo>&#x2062;</mo>
                   <mi>&#x03B8;</mi>
                   <mo>=</mo>
                   <mfrac>
                     <mtext>hypotenuse</mtext>
                     <mtext>opposite</mtext>
                   </mfrac>
                 </mrow>
               </math>`
    },
    {
        title: "Secant Function (sec θ)",
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
                 <mrow>
                   <mi>sec</mi>
                   <mo>&#x2062;</mo>
                   <mi>&#x03B8;</mi>
                   <mo>=</mo>
                   <mfrac>
                     <mtext>hypotenuse</mtext>
                     <mtext>adjacent</mtext>
                   </mfrac>
                 </mrow>
               </math>`
    },
    {
        title: "Cotangent Function (cot θ)",
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
                 <mrow>
                   <mi>cot</mi>
                   <mo>&#x2062;</mo>
                   <mi>&#x03B8;</mi>
                   <mo>=</mo>
                   <mfrac>
                     <mtext>adjacent</mtext>
                     <mtext>opposite</mtext>
                   </mfrac>
                 </mrow>
               </math>`
    },
    {
        title: "Pythagorean Identity",
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <msup>
      <mi>sin</mi>
      <mn>2</mn>
    </msup>
    <mo>&#x2062;</mo> <!-- Invisible times -->
    <mi>&#x03B8;</mi> <!-- Theta -->
    <mo>+</mo>
    <msup>
      <mi>cos</mi>
      <mn>2</mn>
    </msup>
    <mo>&#x2062;</mo> <!-- Invisible times -->
    <mi>&#x03B8;</mi> <!-- Theta -->
    <mo>=</mo>
    <mn>1</mn>
  </mrow>
</math>
            `

    },
    {
        title: "Relationship Between sin θ, cos θ, and tan θ",
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
                       <mrow>
                         <mfrac>
                           <mrow>
                             <mi>sin</mi>
                             <mo>&#x2062;</mo>
                             <mi>&#x03B8;</mi>
                           </mrow>
                           <mrow>
                             <mi>cos</mi>
                             <mo>&#x2062;</mo>
                             <mi>&#x03B8;</mi>
                           </mrow>
                         </mfrac>
                         <mo>=</mo>
                         <mi>tan</mi>
                         <mo>&#x2062;</mo>
                         <mi>&#x03B8;</mi>
                       </mrow>
                     </math>`
    }
];
