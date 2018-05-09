/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 解析模板，得到抽象语法树
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化AST
    optimize(ast, options)
  }
  const code = generate(ast, options)
  console.log(code)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
