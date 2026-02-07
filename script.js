function newtonIterations(f, df, x0, steps) {
  let rows = [];
  let x = x0;

  for (let i = 0; i < steps; i++) {
    let fx = f(x);
    let dfx = df(x);
    let xnext = x - fx / dfx;

    rows.push({ next: xnext });
    x = xnext;
  }

  return rows;
}

function makeTable(rows) {
  let html = "<table><tr><th>Iteration</th><th>xₙ₊₁</th></tr>";

  rows.forEach((r, i) => {
    html += `<tr>
      <td>${i + 1}</td>
      <td>${r.next.toFixed(6)}</td>
    </tr>`;
  });

  html += "</table>";
  return html;
}

/* Example 1 */
const f1 = x => 4*x - Math.exp(x);
const df1 = x => 4 - Math.exp(x);

let ex1 = newtonIterations(f1, df1, 2.5, 3);
document.getElementById("ex1Table").innerHTML = makeTable(ex1);

/* Example 2 */
const f2 = x => 2*x*x*x - 3*x - 6;
const df2 = x => 6*x*x - 3;

let ex2 = newtonIterations(f2, df2, 1.5, 3);
document.getElementById("ex2Table").innerHTML = makeTable(ex2);

/* User Solver */

function solveUser() {
  const fstr = document.getElementById("ufunc").value;
  const dstr = document.getElementById("uderiv").value;
  const x0 = parseFloat(document.getElementById("ux0").value);
  const steps = parseInt(document.getElementById("uiter").value);

  if (!fstr || !dstr || isNaN(x0) || isNaN(steps) || steps <= 0) {
    alert("Please fill all fields and enter valid iterations");
    return;
  }

  const f = x => eval(fstr);
  const df = x => eval(dstr);

  const rows = newtonIterations(f, df, x0, steps);
  document.getElementById("userTable").innerHTML = makeTable(rows);
}
