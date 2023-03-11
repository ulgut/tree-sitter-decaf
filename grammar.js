module.exports = grammar({
  name : 'Decaf',

  rules : {
    source_file : $ => repeat1($._decl),
    _decl : $ => choice(
              $._function_decl,
              $._variable_decl,
              $._class_decl,
              $._interface_decl,
              ),
    _variable_decl : $ => seq($._variable, ';'),
    _variable : $ => seq($.type, $.IDENTIFIER),
    type : $ => choice(
             T_Int, T_Double, T_Bool, T_String, T_Identifier,
             seq($.type, '[]')),
    _function_decl : $ => choice(
                       seq($.type, $.T_Identifier, '(', $.formals, ')',
                           $.stmt_block),
                       seq(T_Void, T_Identifier, '(', $.formals, ')',
                           $.stmt_block)),
    formals : $ => optional(seq(repeat1($._variable), ',')),
    _class_decl : $ =>
                    seq(T_Class, T_Identifier,
                        optional(seq(T_Extends, T_Identifier)),
                        optional(seq(T_Implements, repeat1(T_Identifier), ',')),
                        '{', repeat($._field), '}'),

    T_Void : $ => /void/,
    T_Int : $ => /int/,
    T_Double : $ => /double/,
    T_Bool : $ => /double/,
    T_String : $ => /double/,
    T_Class : $ => /class/,
    T_Extends : $ => /extends/,
    T_Identifier : $ => /[a-zA-Z][a-zA-Z_0-9]*/,
  }
});