import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class ArffFormatter<T> {
	private List<ArffBeanInterface> beanList;
	private Class beanClass;
	private String content;
	
	public ArffFormatter(Class c, List<ArffBeanInterface> data){
		this.beanList = data;
		this.beanClass = c;
		genArffContent();
	}
	public String getContent(){
		return this.content;
	}
	private void genArffContent(){
		this.content += "@relation " + getRelation(beanClass.getAnnotations()).name() + "\n\n";
		for(Field field: beanClass.getDeclaredFields()){
			Attribute attr = getAttribute(field.getAnnotations());
			if(attr != null){
				this.content += "@attribute "+attr.name()+" "+attr.type()+"\n\n";
			}
		}
		
	}
	
	private Relation getRelation(Annotation[] annotations){
		Relation relation = null;
		for(Annotation annotation: annotations){
			if(annotation instanceof Relation){
				relation = (Relation)annotation;
			}
		}
		return relation;
	}
	
	private Attribute getAttribute(Annotation[] annotations){
		Attribute attribute = null;
		for(Annotation annotation: annotations){
			if(annotation instanceof Attribute){
				attribute = (Attribute)annotation;
			}
		}
		return attribute;
	}
	public static void main(String[] args){
		List<T> beanList = new ArrayList<String>();
		
	}
}
