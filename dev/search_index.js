var documenterSearchIndex = {"docs":
[{"location":"#DynamicEnergyBudgets","page":"Home","title":"DynamicEnergyBudgets","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Modules = [DynamicEnergyBudgets]\nOrder   = [:module]","category":"page"},{"location":"#DynamicEnergyBudgets.DynamicEnergyBudgets","page":"Home","title":"DynamicEnergyBudgets.DynamicEnergyBudgets","text":"DynamicEnergyBudgets\n\n(Image: ) (Image: ) (Image: Build Status) (Image: codecov.io)\n\nA Dynamic Energy Budget modelling framework written in Julia.\n\nThis is a generalised DEB model that for plant modelling, but can used to used model any kind of organism.\n\nThis models can also be run in microclimates provided by the NicheMapR R package using Microclimate.jl,  and can use wide a range of photosynthesis and stomatal conductance formulations  from Photosynthesis.jl.\n\nSee scripts at https://github.com/rafaqz/DEBplant for a live user interface and plotting examples.\n\nCode is largely adapted from the original DEBtool plant model by Bas Kooijman.\n\n(Image: Plant model)\n\n\n\n\n\n","category":"module"},{"location":"#Model","page":"Home","title":"Model","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Basic types functions of a DEB model.","category":"page"},{"location":"","page":"Home","title":"Home","text":"AbstractOrgan\nOrgan\nAbstractVars\nVars\nPlottableVars\nAbstractParams\nParams\nAbstractSharedParams\nSharedParams\nAbstractOrganism\nPlant\nDynamicEnergyBudgets.debmodel!\nDynamicEnergyBudgets.metabolism!","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractOrgan","page":"Home","title":"DynamicEnergyBudgets.AbstractOrgan","text":"abstract type AbstractOrgan\n\nAbstract supertype for organs. Inherit from it if you need to difine behaviour different to that or Organ.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.Organ","page":"Home","title":"DynamicEnergyBudgets.Organ","text":"struct Organ{P, S, V, F} <: AbstractOrgan{P,S}\n\nOrgan(params, shared, vars, J)\n\nBasic model components. For a plants, organs might be roots, stem and leaves\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.AbstractVars","page":"Home","title":"DynamicEnergyBudgets.AbstractVars","text":"abstract type AbstractVars\n\nModel variables.  Allow storing and accessing variables for use by multiple components.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.Vars","page":"Home","title":"DynamicEnergyBudgets.Vars","text":"Vars()\n\nMutable struct to allow storing variables for use by multiple components.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.PlottableVars","page":"Home","title":"DynamicEnergyBudgets.PlottableVars","text":"PlottableVars()\n\nPlottable model variables. These are vectors witih values for each time-step, to allow plotting and model introspection.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.AbstractParams","page":"Home","title":"DynamicEnergyBudgets.AbstractParams","text":"abstract type AbstractParams\n\nAbstract supertype for organ parameters.  Extend to add additional components to organ parameters.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.Params","page":"Home","title":"DynamicEnergyBudgets.Params","text":"Model parameters that vary between organs\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.AbstractSharedParams","page":"Home","title":"DynamicEnergyBudgets.AbstractSharedParams","text":"abstract type AbstractSharedParams\n\nAstract supertype for shared parameters.  Extend to change the components that are shared.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.SharedParams","page":"Home","title":"DynamicEnergyBudgets.SharedParams","text":"SharedParams(su_pars, core_pars, resorption_pars, tempcorr_pars, catabolism_pars)\n\nModel parameters shared between organs.\n\nFieldMetadata macros\n\n@default_kw provides default values and constructors, \n@selectable provides the set of types that can be used for the parameter, so that they can be selected in a live interface.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.AbstractOrganism","page":"Home","title":"DynamicEnergyBudgets.AbstractOrganism","text":"abstract type AbstractOrganism\n\nA an Organism is a model object for modelling the growth of a single organism.\n\nIt can be run as a functor:\n\n(o::AbstactOrganism)(du, u, p, t) =\n...\n\nSo that it can be passed into DifferentialEquations.jl solvers if required.\n\nWhere du is the flux to be updated, u is the current state,  p are new model paremeters or nothing, and t is the current time step. See model.jl for implemntations.\n\nWhen julia 1.5 is released this will be implemented for any  AbstactOrganism, but for now it is only implemented for Plant due to current limitations in Julia.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.Plant","page":"Home","title":"DynamicEnergyBudgets.Plant","text":"Plant(params, shared, records, environment, environment_start, dead)\nPlant(states=(:V, :C, :N),\n      transformations=(:asi, :gro, :mai, :rej, :res),\n      params=(ShootParamsCN(), RootParamsCN()),\n      vars=(Vars(), Vars()),\n      shared=SharedParams(),\n      records=nothing,\n      environment=nothing,\n      time=0.0hr:1.0hr:8760.0hr,\n      environment_start=Ref(1.0hr),\n      dead=Ref(false))\n\nPlant model.\n\nparams are a tuple of Parameters objects, one for each organ.\n\nshared is a struct of parameters shared between organs.\n\nvars: can be Vars or PlottableVars or custom struct with additional variables.   PlottableVars will be stored for each timestep for plotting.\n\nenvironment can be nothing, or a MicroclimPoint or MicroclimControl from Microclimates.jl\n\ntime determines the timespan over which PlottableVars will be constructed. it isn't used with regular Vars.\n\nIf 4 state model is used, pass in\n\nstates=(:V, :E, :C, :N),\n\nSimilarly, if additional components like Maturity or ActiveTranslocation  are used, their state label needs to be passed in:\n\ntransformations=(:asi, :gro, :mai, :mat, :rej, :tra, :res),\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.debmodel!","page":"Home","title":"DynamicEnergyBudgets.debmodel!","text":"debmodel!(organs::Tuple, u::Tuple{AbstractArray}, env)\n\nA generalised multi-reserve, multi-organ Dynamic Energy Budget model.\n\nThe method applies metabolism, translocation and assimilation methods  to all organs. If metabolism fails in any organ, the organism is dead, and false is returned.\n\norgans is a tuple of Organ, u is a tuple of organ state variable vectors,  env is the environment component (or nothing).\n\n\n\n\n\n","category":"function"},{"location":"#DynamicEnergyBudgets.metabolism!","page":"Home","title":"DynamicEnergyBudgets.metabolism!","text":"metabolism!(organs::Tuple, u::Tuple)\nmetabolism!(o::AbstractOrgan, u::AbstractVector)\n\nMetabolism is the same basic process for all organs,  with potentially different components and parameters.\n\ncatabolism! determines the current growth rate, flux from reserve and wether the organism is still alive,\n\nThen growth, maintenence, maturity and resorption update the flux matrix o.J based on catabolised reserve and state u.\n\n\n\n\n\n","category":"function"},{"location":"#Components","page":"Home","title":"Components","text":"","category":"section"},{"location":"#Core-Parameters","page":"Home","title":"Core Parameters","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DEBCore\nDynamicEnergyBudgets.growth!\nDynamicEnergyBudgets.maintenance!","category":"page"},{"location":"#DynamicEnergyBudgets.DEBCore","page":"Home","title":"DynamicEnergyBudgets.DEBCore","text":"DEBCore(y_V_E, y_E_C, y_E_N, n_N_V, n_N_E, w_V)\n\nCore DEB model parameters.\n\nField Description Default Bounds\njEmai Specific somatic maintenance costs 0.01 (0.0001, 1.0)\nyVE Yield from reserve to structure 0.7 (0.0, 1.0)\nyEC Yield from C-reserve to general reserve 0.7 (1.0e-6, 1.0)\nyEN Yeild from N-reserve to general reserve 30.0 (1.0, 50.0)\nnNV Nitrogen per Carbon in structure 0.03 (0.0, 0.1)\nnNE Nitrogen per Carbon in reserve 0.025 (0.0, 0.1)\nw_V Mol-weight of shoot structure 25.0 (15.0, 40.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.growth!","page":"Home","title":"DynamicEnergyBudgets.growth!","text":"growth!(o::AbstractOrgan, u)\ngrowth!(p::DEBCore, o::AbstractOrgan, u)\n\nAllocates reserves to growth flux, generalised for any number of reserves.\n\nWhere o is the Organ, and u is the current state parameters\n\n\n\n\n\n","category":"function"},{"location":"#DynamicEnergyBudgets.maintenance!","page":"Home","title":"DynamicEnergyBudgets.maintenance!","text":"maintenence!(o::AbstractOrgan, u)\nmaintenence!(p::DEBCore, o::AbstractOrgan, u)\n\nAllocates reserve drain due to maintenance, generalised for any number of reserves.\n\nMaintenance is temperature dependent.\n\nWhere o is the Organ, and u is the current state parameters\n\n\n\n\n\n","category":"function"},{"location":"#Allometry","page":"Home","title":"Allometry","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractAllometry\nAllometry\nSqrtAllometry\nFixedAllometry","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractAllometry","page":"Home","title":"DynamicEnergyBudgets.AbstractAllometry","text":"abstract type AbstractAllometry\n\nAllometry. Scaling rules that relate size to mass\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.Allometry","page":"Home","title":"DynamicEnergyBudgets.Allometry","text":"Allometry(β0, β, α)\n\nSimple allometric relationship between mass and height\n\nField Description Default Bounds\nβ0 Intercept. Mass at Om 0.0024000000000000002 (1.0e-6, 10.0)\nβ1 Scalar for conversion to meters 0.1 (1.0e-5, 10.0)\nα Exponent relating mass to vertical dimension 0.1 (0.001, 100.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.SqrtAllometry","page":"Home","title":"DynamicEnergyBudgets.SqrtAllometry","text":"SqrtAllometry(β0, β)\n\nHeight is given by the square root of mass above the initial mass β0, multiplied by the scalar β1.\n\nField Description Default Bounds\nβ0 Intercept. Mass at Om 0.0024000000000000002 (1.0e-6, 10.0)\nβ1 Scalar for conversion to meters 0.1 (0.01, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.FixedAllometry","page":"Home","title":"DynamicEnergyBudgets.FixedAllometry","text":"FixedAllometry(height)\n\nHeight is fixed at height, independent of mass.\n\nField Description Default Bounds\nheight Fixed height or depth 1.0 (0.001, 100.0)\n\n\n\n\n\n","category":"type"},{"location":"#Assimilation","page":"Home","title":"Assimilation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractAssim\nAbstractCAssim\nConstantCAssim\nKooijmanSLAPhotosynthesis\nCarbonVars\nAbstractNAssim\nConstantNAssim\nNAssim\nKooijmanNH4_NO3Assim\nNitrogenVars\nDynamicEnergyBudgets.assimilation!\nDynamicEnergyBudgets.photosynthesis\nDynamicEnergyBudgets.nitrogen_uptake","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractAssim","page":"Home","title":"DynamicEnergyBudgets.AbstractAssim","text":"abstract type AbstractAssim\n\nAbstract supertype of all Assimilation components\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.AbstractCAssim","page":"Home","title":"DynamicEnergyBudgets.AbstractCAssim","text":"abstract type AbstractCAssim <: AbstractAssim\n\nAbstract supertype of all Carbon assimilation types\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.ConstantCAssim","page":"Home","title":"DynamicEnergyBudgets.ConstantCAssim","text":"ConstantCAssim(c_uptake)\n\nC is assimilated at a constant rate, without control from the environment\n\nField Description Default Bounds\nc_uptake Constant rate of C uptake 0.1 (0.0, 10.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.KooijmanSLAPhotosynthesis","page":"Home","title":"DynamicEnergyBudgets.KooijmanSLAPhotosynthesis","text":"KooijmanSLAPhotosynthesis(vars, k_C_binding, k_O_binding, K_C, K_O, J_L_K, j_L_Amax, j_C_Amax, j_O_Amax)\n\nParameters for simple photosynthesis module. With specific leaf area to convert area to mass\n\nField Description Default Bounds\nvars  CarbonVars{Unitful.Quantity{Float64,𝐍 𝐋^ (0.0, 1.0)\nkCbinding Scaling rate for carbon dioxide 10000.0 (1.0e-5, 2000.0)\nkObinding Scaling rate for oxygen 10000.0 (1.0e-5, 2000.0)\nK_C Half-saturation concentration of carbon dioxide 2.232142857142857e-6 (1.0e-7, 100.0)\nK_O Half-saturation concentration of oxygen 9.375e-5 (1.0e-7, 100.0)\nJLK Half-saturation flux of useful photons 2000.0 (0.001, 100000.0)\njLAmax Maximum specific uptake of useful photons 100.01 (0.0001, 10000.0)\njCAmax Maximum specific uptake of carbon dioxide 20.0 (5.0, 100.0)\njOAmax Maximum specific uptake of oxygen 0.1 (0.01, 50.0)\nSLA Specific leaf Area. Ferns: 17.4, Forbs: 26.2, Graminoids: 24.0, Shrubs: 9.10, Trees: 8.30 24.0 (5.0, 30.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.CarbonVars","page":"Home","title":"DynamicEnergyBudgets.CarbonVars","text":"CarbonVars(J_L_F, X_C, X_O, soilwaterpotential)\n\nVariables for carbon assimilation\n\nField Description Default Bounds\nJLF Flux of useful photons 0.0036560000000000004 (0.0, 0.00914)\nX_C Carbon dioxide concentration in air 0.00039999999999999996 (0.00019999999999999998, 0.0007)\nX_O Oxygen concentration in air 4.704 (2.2399999999999998, 6.72)\nsoilwaterpotential Soil water potential -100.0 (0.0, -10000.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.AbstractNAssim","page":"Home","title":"DynamicEnergyBudgets.AbstractNAssim","text":"abstract type AbstractNAssim <: AbstractAssim\n\nAbstract supertype of all Nitrogen assimilation types\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.ConstantNAssim","page":"Home","title":"DynamicEnergyBudgets.ConstantNAssim","text":"ConstantNAssim(n_uptake)\n\nN is assimilated at a constant rate, without control from the environment\n\nField Description Default Bounds\nn_uptake Constant rate of N uptake 0.1 (0.0, 0.5)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.NAssim","page":"Home","title":"DynamicEnergyBudgets.NAssim","text":"Parameters for Nitrogen assimilation \n\nField Description Default Bounds\nvars  NitrogenVars{Float64,Unitful.Quantity{Fl (0.0, 1.0)\njNAmax Max spec uptake of ammonia 50.0 (0.1, 1000.0)\nK_N Half-saturation concentration of nitrate 0.01 (0.0001, 1.0)\nK_H Half-saturation concentration of water 10.0 (0.01, 100.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.KooijmanNH4_NO3Assim","page":"Home","title":"DynamicEnergyBudgets.KooijmanNH4_NO3Assim","text":"Parameters for Ammonia/Nitrate assimilation \n\nField Description Default Bounds\nvars  NitrogenVars{Float64,Unitful.Quantity{Fl (0.0, 1.0)\njNHAmax Max spec uptake of ammonia 50.0 (0.1, 1000.0)\njNOAmax Max spec uptake of nitrate 50.0 (0.1, 1000.0)\nρNO Weights preference for nitrate relative to ammonia. 0.7 (0.0001, 1.0)\nyECH_NH From roots C-reserve to reserve using ammonia 1.25 (0.0001, 4.0)\nK_NH Half-saturation concentration of ammonia 0.01 (0.0001, 10.0)\nK_NO Half-saturation concentration of nitrate 0.01 (0.0001, 10.0)\nK_H Half-saturation concentration of water 10.0 (5.0, 20.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.NitrogenVars","page":"Home","title":"DynamicEnergyBudgets.NitrogenVars","text":"NitrogenVars(soilwaterpotential, soilwaterconent, X_NH, X_NO, X_H)\n\nVariables for nitrogen assimilation.\n\nField Description Default Bounds\nsoilwaterpotential Soil water potential -100.0 (0.0, -10000.0)\nsoilwaterconent  -100.0 (0.0, -10000.0)\nX_NH Concentration of ammonia 0.005 (0.0, 0.1)\nX_NO Concentration of nitrate see e.g. (_@crawford1998molecular) 0.01 (0.0, 0.1)\nX_H  10.0 (0.0, 20.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.assimilation!","page":"Home","title":"DynamicEnergyBudgets.assimilation!","text":"assimilation!(o::AbstractOrgan, u)\n\nRuns assimilation methods, depending on formulation and state u.\n\n\n\n\n\n","category":"function"},{"location":"#DynamicEnergyBudgets.photosynthesis","page":"Home","title":"DynamicEnergyBudgets.photosynthesis","text":"photosynthesis(f::AbstractCAssim, o, u)\n\nReturn the assimilated C for Organ o with state variables u.\n\n\n\n\n\n","category":"function"},{"location":"#DynamicEnergyBudgets.nitrogen_uptake","page":"Home","title":"DynamicEnergyBudgets.nitrogen_uptake","text":"nitrogen_uptake(f::ConstantNAssim, o, u)\n\nReturns constant nitrogen assimilation.\n\n\n\n\n\nnitrogen_uptake(f::KooijmanNH4_NO3Assim, o, u)\n\nReturns total nitrogen, nitrate and ammonia assimilated in mols per time.\n\n\n\n\n\nnitrogen_uptake(f::NAssim, o, u)\n\nReturns nitrogen assimilated in mols per time.\n\n\n\n\n\n","category":"function"},{"location":"#Catabolism","page":"Home","title":"Catabolism","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CatabolismCN\nCatabolismCNE\nCatabolismCNshared\nDynamicEnergyBudgets.catabolism!","category":"page"},{"location":"#DynamicEnergyBudgets.CatabolismCN","page":"Home","title":"DynamicEnergyBudgets.CatabolismCN","text":"CatabolismCN(kC, kN)\n\n2-pareter catabolism where reserve turnover rate can be different for C and N reserves.\n\nField Description Default Bounds\nkC C-reserve turnover rate 0.2 (0.0, 1.0)\nkN N-reserve turnover rate 0.2 (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.CatabolismCNE","page":"Home","title":"DynamicEnergyBudgets.CatabolismCNE","text":"CatabolismCNshared(k, kC, kN)\n\n3-pareter catabolism where reserve turnover rate can be different for C, N and E reserves.\n\nField Description Default Bounds\nk Reserve turnover rate 0.2 (0.0, 1.0)\nkC C-reserve turnover rate 0.2 (0.0, 1.0)\nkN N-reserve turnover rate 0.2 (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.CatabolismCNshared","page":"Home","title":"DynamicEnergyBudgets.CatabolismCNshared","text":"CatabolismCNshared(k)\n\n1-pararameter catabolism where reserve turnover rate is the same for both reserves.\n\nField Description Default Bounds\nk Reserve turnover rate 0.2 (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.catabolism!","page":"Home","title":"DynamicEnergyBudgets.catabolism!","text":"catabolism!(o, u)\n\nWhere o is an Organ and u its state variables\n\nCatabolism for E, C and N, or C, N and E reserves.\n\n\n\n\n\n","category":"function"},{"location":"#Environment","page":"Home","title":"Environment","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ManualTemperature\nDynamicEnergyBudgets.apply_environment!","category":"page"},{"location":"#DynamicEnergyBudgets.ManualTemperature","page":"Home","title":"DynamicEnergyBudgets.ManualTemperature","text":"struct ManualTemperature{T}\n\nManualTemperature(airtemperature, soiltemperature)\n\nEnvironment for simple manual temperature control.\n\nField Description Default Bounds\nairtemperature  nothing (0.0, 1.0)\nsoiltemperature  nothing (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.apply_environment!","page":"Home","title":"DynamicEnergyBudgets.apply_environment!","text":"apply_environment!(organism::Organism, organs::Tuple, u, t)\n\nApply environmental conditions to an organism. \n\n\n\n\n\napply_environment!(organism, env::Nothing, organs, u, t)\n\nNo environment included, do nothing. Initial environment variables will be used for the whole simulation\n\n\n\n\n\napply_environment!(plant, env::ManualTemperature, organs, u, t)\n\nApply an environment to a plant using live user input for variables, instead of data.\n\n\n\n\n\n","category":"function"},{"location":"#Germination","page":"Home","title":"Germination","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractGermination\nThresholdGermination\nDynamicEnergyBudgets.isgerminated","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractGermination","page":"Home","title":"DynamicEnergyBudgets.AbstractGermination","text":"abstract type AbstractGermination\n\nAbstract supertype for models that determine the time of germination from current state variable.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.ThresholdGermination","page":"Home","title":"DynamicEnergyBudgets.ThresholdGermination","text":"ThresholdGermination(germination_mass)\n\nGermination occurs past a threshhold structural mass. \n\nThis causes a hard switch in behaviour between\n\nField Description Default Bounds\ngermination_mass Structural mass at germination 1.0e-5 (1.0e-10, 5.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.isgerminated","page":"Home","title":"DynamicEnergyBudgets.isgerminated","text":"isgerminated(formulation, o, u)\n\nCheck if germination has happened.  The default with no formulation is that germination occurs immediately.\n\n\n\n\n\n","category":"function"},{"location":"#Maturity","page":"Home","title":"Maturity","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractMaturity\nMaturity\nDynamicEnergyBudgets.maturity!","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractMaturity","page":"Home","title":"DynamicEnergyBudgets.AbstractMaturity","text":"abstract type AbstractMaturity\n\nMaturity formulations allocate a fraction of  resources to maturity and reproduction.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.Maturity","page":"Home","title":"DynamicEnergyBudgets.Maturity","text":"Maturity(j_E_mat_mai, κmat, threshold)\n\nA maturity model seperated to make maturity modeling optional.\n\nField Description Default Bounds\njEmat_mai Spec maturity maint costs 0.001 (0.0, 0.1)\nκmat Reserve flux allocated to development/reprod. 0.05 (0.0, 1.0)\nthreshold Structural mass at start reproduction 1.0 (0.001, 20.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.maturity!","page":"Home","title":"DynamicEnergyBudgets.maturity!","text":"maturity!(o, u)\nmaturity!(f, o, u)\n\nAllocates reserve drain due to maturity maintenance. Stores in M state variable if it exists.\n\n\n\n\n\n","category":"function"},{"location":"#Production","page":"Home","title":"Production","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Production","category":"page"},{"location":"#DynamicEnergyBudgets.Production","page":"Home","title":"DynamicEnergyBudgets.Production","text":"Production(y_P_V, j_P_mai, n_N_P, w_P)\n\nField Description Default Bounds\nyPV Product formation linked to growth 0.02 (0.0, 1.0)\njPmai Product formation linked to maintenance 0.001 (0.0, 0.1)\nnNP N/C in product (wood) 0.1 (0.0, 1.0)\nw_P Mol-weight of shoot product (wood) 25.0 (10.0, 40.0)\n\n\n\n\n\n","category":"type"},{"location":"#Rate","page":"Home","title":"Rate","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DynamicEnergyBudgets.calc_rate\nDynamicEnergyBudgets.rate_formula","category":"page"},{"location":"#DynamicEnergyBudgets.calc_rate","page":"Home","title":"DynamicEnergyBudgets.calc_rate","text":"function calc_rate(su, rel_reserve::Tuple, turnover::Tuple, \n                   j_E_mai, y_E_Ea, y_E_Eb, y_V_E, κsoma, tstep)\n\nCalculate growth rate using a numeric root-finder, also determining wether the organ is alive or dead.\n\nReturns a Tuple holding the rate and a Bool for alive/dead status\n\n\n\n\n\n","category":"function"},{"location":"#DynamicEnergyBudgets.rate_formula","page":"Home","title":"DynamicEnergyBudgets.rate_formula","text":"rate_formula(r, ureserve::Tuple, turnover::Tuple, j_E_mai, y_V_E, κsoma)\n\nRate formulas for E, CN or CNE reserves\n\n\n\n\n\n","category":"function"},{"location":"#Resorption","page":"Home","title":"Resorption","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractResorption\nLosslessResorption\nStructuralLossResorption\nDissipativeResorption\nDynamicEnergyBudgets.resorption","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractResorption","page":"Home","title":"DynamicEnergyBudgets.AbstractResorption","text":"abstract type AbstractResorption\n\nResorption. Parameters for reabsorbtion of nutrients from structures when metabolic rates fall.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.LosslessResorption","page":"Home","title":"DynamicEnergyBudgets.LosslessResorption","text":"LosslessResorption(K_resorption)\n\nStructure is distributed back to C an N reserves without loss.\n\nField Description Default Bounds\nK_resorption Half saturation metabolic rate for resorption of tissues. 1.0e-6 (1.0e-8, 0.001)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.StructuralLossResorption","page":"Home","title":"DynamicEnergyBudgets.StructuralLossResorption","text":"StructuralLossResorption(K_resorption)\n\nStructure is lost while reserves are retained.\n\nField Description Default Bounds\nK_resorption Half saturation metabolic rate for resorption of tissues. 1.0e-6 (1.0e-8, 0.001)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.DissipativeResorption","page":"Home","title":"DynamicEnergyBudgets.DissipativeResorption","text":"DissipativeResorption(r_EN_V, r_EN_V, K_resorption)\n\nSome structure is distributed back to C an N reserves with a proportion lost to the environment.\n\nThis model has parameters for controlling differential fractions of C an N resorption.\n\nField Description Default Bounds\nK_resorption Half saturation metabolic rate for resorption of tissues. 1.0e-6 (1.0e-8, 0.001)\nrECV Proportion of C recovered from structure 0.0 (0.0, 1.0)\nrENV Proportion of N recovered from structure 0.5 (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.resorption","page":"Home","title":"DynamicEnergyBudgets.resorption","text":"resorption(p::AbstractResorption, o::Organ, u)\n\nResoption of structure V with shape-adjusted metabolic rate\n\n\n\n\n\n","category":"function"},{"location":"#Scaling","page":"Home","title":"Scaling","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractScaling\nIsomorph\nV0morph\nV1morph\nV1V0morph\nPlantmorph\nDynamicEnergyBudgets.scaling_correction","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractScaling","page":"Home","title":"DynamicEnergyBudgets.AbstractScaling","text":"abstract type AbstractScaling\n\nSurface area scaling rules\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.Isomorph","page":"Home","title":"DynamicEnergyBudgets.Isomorph","text":"struct Isomorph <: AbstractScaling\n\nIsomorph()\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.V0morph","page":"Home","title":"DynamicEnergyBudgets.V0morph","text":"V0morph(Vd)\n\nField Description Default Bounds\nVd reference 4.0 (0.0, 1000.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.V1morph","page":"Home","title":"DynamicEnergyBudgets.V1morph","text":"V1morph(Vd)\n\nField Description Default Bounds\nVd reference 4.0 (0.0, 1000.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.V1V0morph","page":"Home","title":"DynamicEnergyBudgets.V1V0morph","text":"V1V0morph(Vd, Vmax, β)\n\nField Description Default Bounds\nVd reference 4.0 (0.0, 1000.0)\nVmax reference 4.0 (0.0, 1000.0)\nβ reference 4.0 (0.0, 10.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.Plantmorph","page":"Home","title":"DynamicEnergyBudgets.Plantmorph","text":"Plantmorph(M_Vref, M_Vscaling)\n\nPlant morph formulation from DEBtool.\n\nField Description Default Bounds\nM_Vref Scaling reference 0.1 (1.0e-5, 20.0)\nM_Vscaling Scaling mass 1.0 (0.0001, 2000.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.scaling_correction","page":"Home","title":"DynamicEnergyBudgets.scaling_correction","text":"scaling_correction(f::AbstractScaling, V)\n\nCalculate the shape/scaling correction coefficient  from the current mass V.\n\n\n\n\n\n","category":"function"},{"location":"#Synthesizing-Units","page":"Home","title":"Synthesizing Units","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractSynthesizingUnit\nParallelComplementarySU\nMinimumRuleSU\nKfamilySU\nDynamicEnergyBudgets.synthesizing_unit\nDynamicEnergyBudgets.stoich_merge","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractSynthesizingUnit","page":"Home","title":"DynamicEnergyBudgets.AbstractSynthesizingUnit","text":"abstract type AbstractSynthesizingUnit\n\nSynthesizing units bind multiple substrates to synthesize compounds,  depending on their availability\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.ParallelComplementarySU","page":"Home","title":"DynamicEnergyBudgets.ParallelComplementarySU","text":"struct ParallelComplementarySU <: AbstractSynthesizingUnit\n\nParallelComplementarySU(k)\n\n0-parameter synthesizing unit that merges two compounds stoichiometrically.\n\nSee Ledder et al 2019. for details.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.MinimumRuleSU","page":"Home","title":"DynamicEnergyBudgets.MinimumRuleSU","text":"struct MinimumRuleSU <: AbstractSynthesizingUnit\n\nMinimumRuleSU(k)\n\n0-parameter synthesizing unit where law of the minimum controls the production of one compound form two other compounds.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.KfamilySU","page":"Home","title":"DynamicEnergyBudgets.KfamilySU","text":"KfamilySU(k)\n\nFlexible 1-parameter synthesizing unit with variable curve. Both MinimumRuleSU and ParallelComplementarySU can be approximated with this rule.\n\nField Description Default Bounds\nk Synthesizing unit parameter. Effiency = 2^-1/k 1.0 (0.0, 10.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.synthesizing_unit","page":"Home","title":"DynamicEnergyBudgets.synthesizing_unit","text":"synthesizing_unit(::AbstractSynthesizingUnit, v, w)\n\nApply a synthesizing unit formulation to substrates v and w, returning the amount of compound.\n\n\n\n\n\n","category":"function"},{"location":"#DynamicEnergyBudgets.stoich_merge","page":"Home","title":"DynamicEnergyBudgets.stoich_merge","text":"stoich_merge(Ja, Jb, ya, yb)\n\nMerge fluxes stoichiometrically into general reserve Eab based on yield fractions ya and yb. An unmixed proportion is returned as unmixed reserves Ea and Eb.\n\n\n\n\n\n","category":"function"},{"location":"#Temperature-Correction","page":"Home","title":"Temperature Correction","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AbstractTemperatureCorrection\nTempCorr\nTempCorrLower\nTempCorrLowerUpper\nParentTardieu\nDynamicEnergyBudgets.tempcorr","category":"page"},{"location":"#DynamicEnergyBudgets.AbstractTemperatureCorrection","page":"Home","title":"DynamicEnergyBudgets.AbstractTemperatureCorrection","text":"abstract type AbstractTemperatureCorrection\n\nTemperature correction parameters\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.TempCorr","page":"Home","title":"DynamicEnergyBudgets.TempCorr","text":"TempCorr(reftemp, arrtemp)\n\nSimple temperature correction parameters\n\nField Description Default Bounds\nreftemp Reference temperature for all rate parameters 300.0 (273.0, 325.0)\narrtemp Arrhenius temperature 2000.0 (200.0, 4000.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.TempCorrLower","page":"Home","title":"DynamicEnergyBudgets.TempCorrLower","text":"TempCorrLower(reftemp, arrtemp, tbelow, arrlower)\n\nTemperature correction with lower bounds parameters.\n\nField Description Default Bounds\nreftemp Reference temperature for all rate parameters 300.0 (273.0, 325.0)\narrtemp Arrhenius temperature 2000.0 (200.0, 4000.0)\ntbelow Lower boundary of tolerance range -30.0 (0.0, -40.0)\narrlower Arrhenius temperature for lower boundary 20000.0 (2000.0, 40000.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.TempCorrLowerUpper","page":"Home","title":"DynamicEnergyBudgets.TempCorrLowerUpper","text":"TempCorrLowerUpper(reftemp, arrtemp, tbelow, arrlower, tabove, arrupper)\n\nTemperature correction with lower and upper bound parameters.\n\nField Description Default Bounds\nreftemp Reference temperature for all rate parameters 300.0 (273.0, 325.0)\narrtemp Arrhenius temperature 2000.0 (200.0, 4000.0)\ntbelow Lower boundary of tolerance range -30.0 (0.0, -40.0)\narrlower Arrhenius temperature for lower boundary 20000.0 (2000.0, 40000.0)\ntabove Upper boundary of tolerance range 5.0 (0.0, 20)\narrupper Arrhenius temperature for upper boundary 70000.0 (7000.0, 140000.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.ParentTardieu","page":"Home","title":"DynamicEnergyBudgets.ParentTardieu","text":"ParentTardieu(ΔH_A, α, t0)\n\nSimple 3 parameter temperature correction method.  Growth response to temperature has smoother transients in plants than in animals,  and a simpler formulaiton is more applicable.\n\nField Description Default Bounds\nΔH_A The enthalpy of activation of the reaction. Determines the curvature at low temperature 63.5 (55.0, 65.0)\nα The ratio ΔHD / ΔHA 3.5 (1.0, 10.0)\nt0 Reference temperature 300.0 (273.0, 325.0)\nA Trait scaling coefficient, calculated from other params 0.0 (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.tempcorr","page":"Home","title":"DynamicEnergyBudgets.tempcorr","text":"tempcorr(f, t)\n\nTemperature related correction of growth rate.\n\n-f: a formulation struct or nothing for no temperature correction. -t: the current temperature, in degrees Celcius or Kelvin (Unitful.jl u\"°C\" or u\"K\")\n\n\n\n\n\n","category":"function"},{"location":"#Translocation","page":"Home","title":"Translocation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DissipativePassiveTranslocation\nLosslessPassiveTranslocation\nLosslessActiveTranslocation\nDissipativeActiveTranslocation\nDynamicEnergyBudgets.active_translocation!\nDynamicEnergyBudgets.passive_translocation!\nDynamicEnergyBudgets.translocation!","category":"page"},{"location":"#DynamicEnergyBudgets.DissipativePassiveTranslocation","page":"Home","title":"DynamicEnergyBudgets.DissipativePassiveTranslocation","text":"DissipativeRejection(y_EC_ECT, y_EN_ENT)\n\nSubstrate rejected from synthesizing units during catabolism is returned to reserve, but with some fraction of loss specified by yield parameters.\n\nField Description Default Bounds\nyECECT yield of translocated C-reserve 1.0 (0.0, 1.0)\nyENENT yield of Translocated N-reserve 1.0 (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.LosslessPassiveTranslocation","page":"Home","title":"DynamicEnergyBudgets.LosslessPassiveTranslocation","text":"struct LosslessPassiveTranslocation <: PassiveTranslocation\n\nLosslessPassiveTranslocation()\n\nParameterless rejection where substrate rejected from synthesizing units during catabolism is returned to reserve without loss.\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.LosslessActiveTranslocation","page":"Home","title":"DynamicEnergyBudgets.LosslessActiveTranslocation","text":"DissipativeTranslocation(κtra, y_E_ET)\n\nPerfect translocation between structures.\n\nField Description Default Bounds\nκtra Reserve flux allocated to translocation 0.6 (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.DissipativeActiveTranslocation","page":"Home","title":"DynamicEnergyBudgets.DissipativeActiveTranslocation","text":"DissipativeTranslocation(κtra, y_E_ET)\n\nTranslocation with dissipative losses to the environment.\n\nField Description Default Bounds\nyEET yield of translocated reserve: 0.8 (0.0, 1.0)\nκtra Reserve flux allocated to translocation 0.6 (0.0, 1.0)\n\n\n\n\n\n","category":"type"},{"location":"#DynamicEnergyBudgets.active_translocation!","page":"Home","title":"DynamicEnergyBudgets.active_translocation!","text":"active_translocation!(o1, o2)\n\nTranslocation that actively moves a fraction of catabolised  reserve between organs.\n\n\n\n\n\n","category":"function"},{"location":"#DynamicEnergyBudgets.passive_translocation!","page":"Home","title":"DynamicEnergyBudgets.passive_translocation!","text":"passive_translocation!(source, dest)\n\nRealocate state rejected from synthesizing units.\n\n\n\n\n\n","category":"function"},{"location":"#DynamicEnergyBudgets.translocation!","page":"Home","title":"DynamicEnergyBudgets.translocation!","text":"translocation!(organs::Tuple)\n\nTranslocation occurs between adjacent organs in  both directions.\n\nBoth active and passive translocation are applied, although nothing valued formulations do not translocate.\n\n\n\n\n\n","category":"function"},{"location":"#Other-functions","page":"Home","title":"Other functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Low-level model functions","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [DynamicEnergyBudgets]\nPages   = [\"functions.jl\", \"setup.jl\"]","category":"page"},{"location":"#DynamicEnergyBudgets.half_saturation-Tuple{Any,Any,Any}","page":"Home","title":"DynamicEnergyBudgets.half_saturation","text":"half_saturation(max, half, x)\n\nHalf satration curve.\n\n\n\n\n\n","category":"method"},{"location":"#DynamicEnergyBudgets.reserve_drain!-Tuple{AbstractOrgan,Any,Any}","page":"Home","title":"DynamicEnergyBudgets.reserve_drain!","text":"reserve_drain!(o::AbstractOrgan, column, drain)\n\nGeneralised reserve drain for any flux column (ie :gro),  specified by its Symbol or Int index.\n\n\n\n\n\n","category":"method"},{"location":"#DynamicEnergyBudgets.sum_flux!-Tuple{Any,Tuple}","page":"Home","title":"DynamicEnergyBudgets.sum_flux!","text":"sum_flux!(du, organs::Tuple)\n\nSum flux matrix and write to du.\n\n\n\n\n\n","category":"method"},{"location":"#DynamicEnergyBudgets.check_params-Tuple{Tuple}","page":"Home","title":"DynamicEnergyBudgets.check_params","text":"check_params(o)\n\nCheck DEB parameters to avoid breaking mass balance. Can be pased an organ or tuple of organs.\n\n\n\n\n\n","category":"method"},{"location":"#DynamicEnergyBudgets.split_state-Tuple{Tuple,AbstractArray}","page":"Home","title":"DynamicEnergyBudgets.split_state","text":"split_state(o::Tuple, u::AbstractArray)\n\nSplit state vector into multiple views, one for each organ.\n\nWe do this recursively for type stability.\n\n\n\n\n\n","category":"method"}]
}
