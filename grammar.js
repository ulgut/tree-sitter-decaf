module.exports = grammar({
  name : 'Decaf',

  rules : {
    program : $ => repeat($._decl),
  }
});