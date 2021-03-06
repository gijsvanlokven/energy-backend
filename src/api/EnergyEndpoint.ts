import express = require('express');
import * as Parallel from 'async-parallel';
import database from "../database";
import APIEndpoint from "../APIEndpoint";

export default class EnergyEndpoint implements APIEndpoint {
	Name = "energy"
	get Router() {
		return express.Router()
			.post("/", this.Dagwaardes);
	}

	async Dagwaardes(req: express.Request, res: express.Response) {	

		try{
			var list = ["SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_verwarmen_2' and timestamp >= CURDATE() ORDER BY timestamp DESC;", "SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_koelen_2' and timestamp >= CURDATE() ORDER BY timestamp DESC;", "SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_verwarmen_1' and timestamp >= CURDATE() ORDER BY timestamp DESC;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[8]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[8]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[6]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[6]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[1]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[1]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[2]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[2]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[3]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[3]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[4]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[4]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_KwH[10]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;", "SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_KwH[10]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;"]
			var data = [] as any[];
			var result = await Parallel.map(list, async item =>{
				var temp = await database.query(item);
				data.push(temp.results[0].value);
			});
			res.status(200).send(data);
		}
		catch(err){
			res.status(400).send(err);
		}
		
		/*try {
			let result = await database.query(`
				SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_verwarmen_2' and timestamp >= CURDATE() ORDER BY timestamp DESC;
				SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_koelen_2' and timestamp >= CURDATE() ORDER BY timestamp DESC;
				SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_verwarmen_1' and timestamp >= CURDATE() ORDER BY timestamp DESC;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[8]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[8]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[6]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[6]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[1]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[1]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[2]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[2]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[3]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[3]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[4]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[4]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_KwH[10]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_KwH[10]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[8]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[8]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[6]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[6]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[1]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[1]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[2]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[2]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[3]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[3]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[4]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[4]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_KwH[10]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;
				SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_KwH[10]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;
			`);
			/*
			var Verwarmen = await database.query("SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_verwarmen_2' and timestamp >= CURDATE() ORDER BY timestamp DESC;");
			var Koelen = await database.query("SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_koelen_2' and timestamp >= CURDATE() ORDER BY timestamp DESC;");

			var Tapwater = await database.query("SELECT SUM(value) AS value FROM measurements WHERE tag = 'c16758.deltaQ_verwarmen_1' and timestamp >= CURDATE() ORDER BY timestamp DESC;")

			var pv1_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
      		var pv1_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");
      		var pv1_verbruikt_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var pv1_vebruikt_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[9]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");
			
			var pv2_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var pv2_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Reverse_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");
			var pv2_verbruikt_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var pv2_vebruikt_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_Forward_kwh[5]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");

			var wp_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[8]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var wp_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[8]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");

			// Boiler
			var boiler_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[6]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var boiler_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_kwh[6]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");

			// Warmtepomp water
			var wpWater_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[1]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var wpWater_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[1]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");

			// Tapwater water
			var tapwaterWater_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[2]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var tapwaterWater_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[2]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");

			// Verwarming water
			var verwarmingWater_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[3]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var verwarmingWater_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[3]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");

			// Zonneboiler water
			var zonneboilerWater_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[4]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var zonneboilerWater_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Sensus_Volume_Total[4]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");

			// Hoofdmeter
			var totaalEnergie_oud = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_KwH[10]' and timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1;");
			var totaalEnergie_nieuw = await database.query("SELECT value FROM measurements WHERE tag = 'c16758.Inepro_Total_KwH[10]' and timestamp >= CURDATE() ORDER BY timestamp DESC LIMIT 1;");

			let data = { 
				"Verwarmen_energie": Koelen.results[0].value,
				"Koelen_energie": Verwarmen.results[0].value,
				"Tapwater_energie": Tapwater.results[0].value,
				"PV1": ((pv1_nieuw.results[0].value - pv1_oud.results[0].value) - (pv1_vebruikt_nieuw.results[0].value - pv1_verbruikt_oud.results[0].value)),
				"PV2": ((pv2_nieuw.results[0].value - pv2_oud.results[0].value) - (pv2_vebruikt_nieuw.results[0].value - pv2_verbruikt_oud.results[0].value)),
				"wp_elektra": (wp_nieuw.results[0].value - wp_oud.results[0].value),
				"boiler_electa": (boiler_nieuw.results[0].value - boiler_oud.results[0].value),
				"wp_water": (wpWater_nieuw.results[0].value - wpWater_oud.results[0].value),
				"tapwater_water": (tapwaterWater_nieuw.results[0].value - tapwaterWater_oud.results[0].value),
				"verwarming_water": (verwarmingWater_nieuw.results[0].value - verwarmingWater_oud.results[0].value),
				"zonneboiler_water": (zonneboilerWater_nieuw.results[0].value - zonneboilerWater_oud.results[0].value),
				"Totaal_Elektra": (totaalEnergie_nieuw.results[0].value - totaalEnergie_oud.results[0].value)
			};
			*//*
			let data = result.results;
			console.log(data);

			res.send(data);
		}
		catch (err) {
			res.send(err);
			
		}
		*/
	}
		
}
