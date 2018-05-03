@Relation(name="iris")
public class ArffBean implements ArffBeanInterface{
	@Attribute(name="sepallength", type="numeric")
	private String sepallength;
	
	@Attribute(name="sepalwidth", type="numeric")
	private String sepalwidth;
	
	private String getData(){
		return sepallength+","+sepalwidth;
	}
}
