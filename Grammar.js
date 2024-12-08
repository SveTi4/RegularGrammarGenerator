// Генерация правил для ПЛ и ЛЛ регулярных грамматик
const generateGrammarRules = (alphabet, substring, multiple, isLeftLinear = false) => {
  let rules = {};

  // Генерация правил для S
  for (let i = 0; i < multiple; i++) {
    let nextState = (i + 1) % multiple;
    let transitions = alphabet.map(letter =>
      isLeftLinear ? `S${nextState}${letter}` : `${letter}S${nextState}`
    );
    rules[`S${i}`] = transitions;
  }

  // Генерация правил для A
  for (let i = 0; i < multiple; i++) {
    let nextState = (i + 1) % multiple;
    let transitions = alphabet.map(letter =>
      isLeftLinear ? `A${nextState}${letter}` : `${letter}A${nextState}`
    );
    rules[`A${i}`] = transitions;
  }

  // Добавляем лямбду к A0
  rules[`A0`].push('L');

  // Добавляем подцепочку в переходы (если подцепочка не пустая)
  if (substring) {
    for (let i = 0; i < multiple; i++) {
      let nextState = (i + substring.length) % multiple;
      if (isLeftLinear) {
        rules[`S${i}`].push(`A${nextState}${substring}`);
      } else {
        rules[`S${i}`].push(`${substring}A${nextState}`);
      }
    }
  }

  return rules;
}

function chainsGenerator(alphabet, nonTerminals, rules, startSymbol, minLength, maxLength, isLeftLinear = false) {
  // Проверяем, является ли символ терминальным (не входит в список нетерминалов)
  const isTerminal = (char) => !nonTerminals.some(nonTerminal => nonTerminal.startsWith(char));

  const chains = new Set(); // Для хранения всех найденных цепочек

  // Функция генерации ветвей для цепочки
  function generateBranches(chain) {
    const branches = [];
    const isLeaf = chain.split("").every(isTerminal); // Если цепочка состоит только из терминальных символов

    // Добавляем цепочку в chains только если она состоит из терминалов и имеет допустимую длину
    if (isLeaf) {
      if (chain.length >= minLength && chain.length <= maxLength) {
        chains.add(chain);
        console.log(`${chain} is Leaf, break`);
      }
      return [];
    }

    // Прерываем, если цепочка превышает максимальную длину
    if (chain.length > maxLength + 2) {
      console.log(chain + " is too long");
      return [];
    }


    // Рекурсивно разбираем цепочку
    console.log(`chain: ${chain}`)
    for (let i = 0; i < chain.length-1; i++) {
      console.log(`chain ${chain} i: ${i+1}/${chain.length-1}, char ${chain.slice(i, i + 2)}`)
      const char = chain.slice(i, i + 2); // Разделяем символ с его цифрой, например, S0

      // Если символ нетерминальный (например, S0, A1)
      if (!isTerminal(char)) {
        // Применяем все возможные замены из правил
        rules[char].forEach((replacement) => {
          let newChain;
          // Если лямбда, убираем символ
          if (replacement === "L") {
            newChain = chain.slice(0, i) + chain.slice(i + 2); // Убираем 2 символа
          } else {
            // Леволинейная или праволинейная подстановка
            newChain = isLeftLinear
              ? chain.slice(0, i) + replacement + chain.slice(i + 2) // Леволинейная подстановка
              : chain.slice(0, i) + chain.slice(i + 2) + replacement; // Праволинейная подстановка
          }

          // Рекурсивное продолжение ветвления, если длина не превышает maxLength
          branches.push({
            chain: newChain,
            branches: generateBranches(newChain), // Рекурсивное продолжение
            isLeaf: newChain.split("").every(isTerminal),
          });
        });
        break; // Прерываем, чтобы подставлять только в первый нетерминальный символ
      }
    }

    return branches;
  }

  // Запускаем процесс с начальной цепочкой
  return {
    data: {
      chain: startSymbol,
      branches: generateBranches(startSymbol),
      isLeaf: startSymbol.split("").every(isTerminal),
    },
    chains: Array.from(chains), // Возвращаем результат как массив
  };
}

function pruneTree(data) {
  if (!data.branches || data.branches.length === 0) {
    return data.isLeaf ? data : null; // If no branches and not a leaf, return null
  }

  // Recursively prune branches
  const filteredBranches = data.branches
    .map(pruneTree)
    .filter(branch => branch !== null);

  // If no branches left and not a leaf, return null
  if (filteredBranches.length === 0 && !data.isLeaf) {
    return null;
  }

  return {
    ...data,
    branches: filteredBranches,
    isLeaf: data.isLeaf,
  };
}

const nonTerminals = ["S0", "S1", "S2", "A0", "A1", "A2"];
const startSymbol = "S0";
const alphabet = ['a', 'b'];
const subchain = 'ab';
const minLength = 2;
const maxLength = 6;
const divisions = 2;
const isLeftLinear = false;

const rules = generateGrammarRules(alphabet, subchain, divisions, isLeftLinear);
console.log(rules)

let { data, chains } = chainsGenerator(alphabet, nonTerminals, rules, startSymbol, minLength, maxLength, isLeftLinear);

chains.sort((a, b) => {
  if (a.length === b.length) {
    return a.localeCompare(b); // Сравнение строк в лексикографическом порядке
  }
  return a.length - b.length; // Сравнение по длине
});
//
console.log(data)
console.log(chains);

data = pruneTree(data);
