<script>
  import { derived, writable } from "svelte/store";

  const yieldRates = {
    NoRES: 35,
    LoRES: 38.5,
    RES: 42,
    HiRES: 47.25,
    HazRES: 50.75,
  };
  const laserDraw1d = 1.5;
  const laserDraw2d = 3;
  const fragRate1d = 8.5 / 60;
  const fragRate2d = 25.1 / 60;

  let pdCapacity = writable();
  let pdRecharge = writable();

  let lasers1d = writable(0);
  let lasers2d = writable(0);
  let collectors1d = writable(0);
  let collectors3d = writable(0);
  let collectors5d = writable(0);
  let collectors7d = writable(0);
  
  let zone = writable('NoRES');

  const laserDraw = derived(
    [lasers1d, lasers2d],
    ([$lasers1d, $lasers2d]) => $lasers1d*laserDraw1d + $lasers2d*laserDraw2d
  );

  const fragRate = derived(
    [lasers1d, lasers2d],
    ([$lasers1d, $lasers2d]) => $lasers1d*fragRate1d + $lasers2d*fragRate2d
  );

  const averageYield = derived(
    zone,
    ($zone) => yieldRates[$zone]
  );

  const emptyTimePd = derived(
    [pdCapacity, pdRecharge, laserDraw],
    ([$pdCapacity, $pdRecharge, $laserDraw]) => $pdCapacity / ($pdRecharge - $laserDraw) // TODO handle pdRecharge = laserDraw
  );

  const emptyTimeRock = derived(
    [averageYield, fragRate],
    ([$averageYield, $fragRate]) => $averageYield / $fragRate
  );

  const rockTime = derived(
    [emptyTimePd, emptyTimeRock],
    ([$emptyTimePd, $emptyTimeRock]) => $emptyTimePd > 0 ? $emptyTimeRock : Math.min($emptyTimeRock, Math.abs($emptyTimePd))
  );

  const fragments = derived(
    [rockTime, fragRate],
    ([$rockTime, $fragRate]) => $rockTime * $fragRate
  );

  const rockPercent = derived(
    [fragments, averageYield],
    ([$fragments, $averageYield]) => $fragments / $averageYield
  );

  const activeLimpets = derived(
    [collectors1d, collectors3d, collectors5d, collectors7d],
    ([$collectors1d, $collectors3d, $collectors5d, $collectors7d]) => $collectors1d + 2*$collectors3d + 3*$collectors5d + 4*$collectors7d
  );

  const pdSurplus = derived(
    [emptyTimePd, emptyTimeRock, fragRate],
    ([$emptyTimePd, $emptyTimeRock, $fragRate]) =>
      $emptyTimePd > 0 ? Infinity : (Math.abs($emptyTimePd) < $emptyTimeRock ? 0 : (Math.abs($emptyTimePd) - $emptyTimeRock) * $fragRate)
  );

  const hatchDistance = derived(
    [rockTime, fragments, activeLimpets],
    ([$rockTime, $fragments, $activeLimpets]) => ($rockTime * 30) / ($fragments / $activeLimpets)
  );

  const score = derived([hatchDistance, pdSurplus, rockPercent], ([$hatchDistance, $pdSurplus, $rockPercent]) => {
    const distanceRate = (1200 - $hatchDistance) / 500;
    const surplusRate = ($pdSurplus === Infinity || $pdSurplus > 22) ? 1 : ($pdSurplus + 33) / 55;
    return (distanceRate + surplusRate + $rockPercent) / 3;
  });

  const grade = derived(
    [hatchDistance, rockPercent],
    ([$hatchDistance, $rockPercent]) => $hatchDistance < 100 || $rockPercent < 0.795 ? "FAIL" : "PASS"
  );
</script>

<main class="container flex flex-col mx-auto gap-4 p-4 border-4 bg-orange-1 text-orange-5 font-text">
  <h1 class="text-center text-2xl font-caps">Mining Build Calculator v0.3.1</h1>
  <h2 class="text-center">Originally created by /u/skyfishgoo</h2>

  <div class="flex justify-center gap-16">
    <table class="text-center font-caps">
      <thead>
        <tr class="border-x-4 border-b-4 border-orange-5">
          <th colspan="2">PD</th>
        </tr>
      </thead>
      <tbody class="font-text font-bold">
        <tr class="divide-x-4 divide-orange-5">
          <td><input type="text" class="bg-black w-16 text-center" bind:value={$pdCapacity} /></td>
          <td><input type="text" class="bg-black w-16 text-center" bind:value={$pdRecharge} /></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>MJ</td>
          <td>MW</td>
        </tr>
      </tfoot>
    </table>
  
    <table class="text-center font-caps">
      <thead>
        <tr class="border-x-4 border-b-4 border-orange-5 divide-x-4 divide-orange-5">
          <th colspan="2">Lasers</th>
          <th colspan="4">Collectors</th>
        </tr>  
      </thead>
      <tbody class="font-text font-bold">
        <tr class="divide-x-4 divide-orange-5">
          <td>
            <select class="bg-black w-16 text-center" bind:value={$lasers1d}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </td>
          <td>
            <select class="bg-black w-16 text-center" bind:value={$lasers2d}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </td>
          <td>
            <select class="bg-black w-16 text-center" bind:value={$collectors1d}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </td>
          <td>
            <select class="bg-black w-16 text-center" bind:value={$collectors3d}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </td>
          <td>
            <select class="bg-black w-16 text-center" bind:value={$collectors5d}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </td>
          <td>
            <select class="bg-black w-16 text-center" bind:value={$collectors7d}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>1D</td>
          <td>2D</td>
          <td>1A</td>
          <td>3A</td>
          <td>5A</td>
          <td>7A</td>
        </tr>
      </tfoot>
    </table>
    <div class="flex-col">
      <div class="font-caps font-bold text-center p-px border-x-4 border-b-4 border-orange-5">Zone</div>
      <select class="bg-black font-bold text-center m-0.5" bind:value={$zone}>
        <option>NoRES</option>
        <option>LoRES</option>
        <option>RES</option>
        <option>HiRES</option>
        <option>HazRES</option>
      </select>
    </div>
  </div>

  <div>
    <p>
      On average this build:
    </p>
    <p>
      > Depletes asteroids <span class="font-bold">{($rockPercent*100).toFixed(0)}%</span> in continuous operation for <span class="font-bold">{$rockTime.toFixed(0)}s</span>
    </p>
    <p>
      > Has <span class="font-bold">{$activeLimpets}</span> active limpets to collect <span class="font-bold">~{$fragments}</span> fragments
    </p>
    <p>
      > PD had margin for <span class="font-bold">{$pdSurplus === Infinity ? "∞" : $pdSurplus.toFixed(0)}</span> additional fragments before empty
    </p>
    <p>
      > Requires cargo hatch to be within <span class="font-bold">{$hatchDistance.toFixed(0)}m</span> of the rock face
    </p>  
  </div>

  <div class="flex justify-center gap-4 font-caps">
    <div>
      SCORE: <span class="font-bold font-text">{($score*100).toFixed(0)}%</span>
    </div>
    <div>
      GRADE: <span class="font-bold font-text">{$grade}</span>
    </div>
  </div>

  <div class="font-caps text-green-4 text-center text-xl">Don't forget your limpets</div>
</main>
