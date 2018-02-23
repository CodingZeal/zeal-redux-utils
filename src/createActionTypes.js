import { assoc, reduce } from "ramda";

export default function createActionTypes(namespace, list) {
  const addNamespace = type => "~" + namespace + "/" + type;

  return reduce(
    (constants, type) => assoc(type, addNamespace(type), constants),
    {},
    list
  );
}
